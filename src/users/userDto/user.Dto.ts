import { IsString } from "class-validator";

export class userDto{
    @IsString()
    email: string;
    @IsString()
    password: string;
}