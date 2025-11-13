export declare class UserResponseDto {
    password: string;
    token: string | undefined;
    refreshToken: string | undefined;
    constructor(partial: Partial<UserResponseDto>, token?: string, refreshToken?: string);
}
