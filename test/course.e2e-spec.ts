//course.e2e-spec.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' }); // force using .env.test instead of .env

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Course } from '../src/course/course.entity';
import { CreateCourseDto } from '../src/course/dtos/createCourse.dto';
import { DataSource } from 'typeorm';
import request from 'supertest';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let coursesToSave: CreateCourseDto[];

  beforeEach(async () => {
    coursesToSave = [
      {
        title: 'course 1',
        description: 'course 1 description',
        thumbnailKey: 'key-course',
        price: 105,
        duration: 3,
      },
      {
        title: 'course 2',
        description: 'course 2 description',
        thumbnailKey: 'key-course',
        price: 106,
        duration: 4,
      },
      {
        title: 'course 3',
        description: 'course 3 description',
        thumbnailKey: 'key-course',
        price: 107,
        duration: 5,
      },
      {
        title: 'course 4',
        description: 'course 4 description',
        thumbnailKey: 'key-course',
        price: 108,
        duration: 6,
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.createQueryBuilder().delete().from(Course).execute();
    await app.close();
  });

  // GET: ~/course/
  describe('GET', () => {
    it('should return all courses from db', async () => {
      await dataSource
        .createQueryBuilder()
        .insert()
        .into(Course)
        .values(coursesToSave)
        .execute();
      const response = await request(app.getHttpServer()).get('/course');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(4);
    });
  });
});
