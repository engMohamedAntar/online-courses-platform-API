import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot(), UserModule],
    providers: [{provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor}]
})
export class AppModule {}
