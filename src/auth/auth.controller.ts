import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto, signDto } from './dto';
import { AuthGuard } from 'src/authguard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: signDto, @Response() res) {
    const { access_token } = await this.authService.signin(dto);

    res.cookie('jwt', access_token, {
      httpOnly: true, // Helps mitigate XSS
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      maxAge: 3600000, // 1 hour
    });

    return res.send({ message: 'Logged in successfully' });
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = this.authService.getProfile(req['user']);
    return user;
  }
  @UseGuards(AuthGuard)
  @Patch('editProfile')
  async editProfile(@Req() req: Request, @Body() dto: signDto) {
    const users = req['user'];
    const userId = users?.id; 
    return await this.authService.editProfile(userId, dto);
  }

  @Post('log')
  logout(@Body() dto: signDto) {
    return this.authService.logout(dto);
  }
}
