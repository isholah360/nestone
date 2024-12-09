import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    BookModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
