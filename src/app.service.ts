import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth/dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
