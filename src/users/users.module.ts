import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [
    UsersController,
  ],
  providers: [UsersService],
})
export class UsersModule {}
