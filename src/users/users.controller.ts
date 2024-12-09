import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { userDto } from "./userDto";
import { signDto } from "src/auth/dto";



@Controller('user')
export class UsersController{
  constructor(private usersService: UsersService){}

  @Get()
  getHello (){
    return this.usersService.getHello()
  }
  @Post('reg')
  reg(@Body() dto:userDto){
    return this.usersService.reg(dto);
  }
  @Post('login')
  login(@Body() dto:userDto){
    return this.usersService.login(dto);
  }
  @Post('logout')
  logout(@Body() dto: userDto){
    console.log(dto)
    return this.usersService.logout(dto);
  }

}