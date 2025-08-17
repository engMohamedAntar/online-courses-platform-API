//userResponseDto

import { Exclude } from "class-transformer";

export class UserResponseDto{
    id: number;
    
    @Exclude()
    password: string; 
    token: string;
    constructor(partial: Partial<UserResponseDto>, token: string){
        Object.assign(this,partial);
        this.token= token;
    }
}