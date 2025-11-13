import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { AuthService } from '../auth.service';
declare const GoogleStrategy_base: new (...args: [] | [options: import("passport-google-oauth2").StrategyOptionsWithRequest] | [options: import("passport-google-oauth2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
