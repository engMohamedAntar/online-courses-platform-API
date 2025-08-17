//database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get("DB_USER"), 
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}