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
import path from 'path';
import { User, UserRole } from '../src/user/user.entity';
import bcrypt from 'bcrypt';

describe('CourseController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let coursesToSave: CreateCourseDto[];
  let accessToken;
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

    //saving a new instructor user into db
    const hash = await bcrypt.hash('pass123', 10);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'instructor',
          email: 'instructor@gmail.com',
          password: hash,
          role: UserRole.INSTRUCTOR,
        },
      ])
      .execute();

    //login as instructor
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'instructor@gmail.com', password: 'pass123' });
    accessToken = res.body.accessToken;
  });

  afterEach(async () => {
    await dataSource.createQueryBuilder().delete().from(Course).execute();
    await dataSource.createQueryBuilder().delete().from(User).execute();
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

  //GET: ~/course/:id
  describe('GET /:id', () => {
    it('Should return specified course', async () => {
      //create course
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const { body } = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'course 1')
        .field('description', 'course 1 title')
        .field('price', 30)
        .attach('thumbnail', testImagePath);

      //get the created course
      const response = await request(app.getHttpServer()).get(
        `/course/${body.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(body.id);
      expect(response.body).toMatchObject(body);
    }, 20000);

    it('Should return 404 if course not found', async () => {
      const response = await request(app.getHttpServer()).get('/course/1000');
      expect(response.status).toBe(404);
    });

    it('Should return 400 if invalid id passed', async () => {
      const response = await request(app.getHttpServer()).get('/course/abc');
      expect(response.status).toBe(400);
    });
  });

  // POST: ~/course/
  describe('POST', () => {
    it('should return created course', async () => {
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const response = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'course 1')
        .field('description', 'course 1 title')
        .field('price', 30)
        .attach('thumbnail', testImagePath);

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body).toHaveProperty('thumbnailKey');
    });

    it('should return 400 if title less 3 chars', async () => {
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const response = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'co')
        .field('price', 300)
        .field('description', 'course 1 title')
        .attach('thumbnail', testImagePath);

      expect(response.status).toBe(400);
    });

    it('should return 401 if no token sent', async () => {
      const response = await request(app.getHttpServer())
        .post('/course')
        .field('title', 'cofdsf')
        .field('price', 300)
        .field('description', 'course 1 title');

      expect(response.status).toBe(401);
    });
  });

  //PATCH: ~/course/:id
  describe('PATCH', () => {
    it('should return updated course', async () => {
      //create course
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const { body } = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'course 1')
        .field('description', 'course 1 title')
        .field('price', 30)
        .attach('thumbnail', testImagePath);

      const response = await request(app.getHttpServer())
        .patch(`/course/${body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'updated course' });

      expect(response.status).toBe(200);

      expect(response.body.title).toBe('updated course');
    }, 20000);

    it('should return 400 if title<3 ', async () => {
      //create course
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const { body } = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'course 1')
        .field('description', 'course 1 title')
        .field('price', 30)
        .attach('thumbnail', testImagePath);

      const response = await request(app.getHttpServer())
        .patch(`/course/${body.id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'up' });

      expect(response.status).toBe(400);
    }, 20000);

    it('should return 404 if product not found ', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/course/3`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'upfsdf' });

      expect(response.status).toBe(404);
    }, 20000);

    it('should return 404 if invalid id passed ', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/course/abc`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ title: 'upfsdf' });

      expect(response.status).toBe(400);
    }, 20000);
  });

  //DELETE: ~/course/:id
  describe('DELETE', () => {
    it('status code should be 200', async () => {
      //create course
      const testImagePath = path.join(__dirname, 'test-files', 'thumbnail.jpg');
      const { body } = await request(app.getHttpServer())
        .post('/course')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('title', 'course 1')
        .field('description', 'course 1 title')
        .field('price', 30)
        .attach('thumbnail', testImagePath);

      const response = await request(app.getHttpServer())
        .delete(`/course/${body.id}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
    });

    it('status code should be 401 if no token sent', async () => {
      const response = await request(app.getHttpServer()).delete(`/course/1`);

      expect(response.status).toBe(401);
    });

    it('status code should be 404 if course not found', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/course/1`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });

    it('status code should be 400 if invalid id sent', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/course/abc`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
    });
  });
});
