import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    // ✅ Access Token JWT configuration
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRE_IN'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
