//userResponseDto

import { Exclude } from "class-transformer";

export class UserResponseDto{    
    @Exclude()
    password: string; 
    token: string| undefined;
    constructor(partial: Partial<UserResponseDto>, token?: string){
        Object.assign(this,partial);
        this.token= token;
    }
}