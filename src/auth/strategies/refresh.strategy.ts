import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_JWT_SECRET')!,
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
