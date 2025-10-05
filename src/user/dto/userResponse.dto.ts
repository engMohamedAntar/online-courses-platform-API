//userResponseDto

import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  password: string;
  token: string | undefined;
  refreshToken: string | undefined;


  
  constructor(
    partial: Partial<UserResponseDto>,
    token?: string,
    refreshToken?: string,
  ) {
    Object.assign(this, partial);
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
