import {
  Body,
  ForbiddenException,
  Get,
  Injectable,
  Patch,
  Request,
} from '@nestjs/common';
import { AuthDto, signDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(@Body() dto: AuthDto) {
    const hashPw = await argon2.hash(dto.password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashPw,
          name: dto.name,
        },
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('email taken');
      }
      throw new error();
    }
  }

  async signin(dto: signDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Wrong Credential');

    const correctPw = await argon2.verify(user.password, dto.password);
    if (!correctPw) throw new ForbiddenException('Wrong Credential');

    return this.signToken(user.id, user.email);
  }
  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('SECCRETE_KEY'),
      expiresIn: '15m',
    });
    return { access_token: token };
  }

  getProfile(user: any) {
    return user;
  }
  async editProfile(userId: string, dto: signDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...dto,
        },
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      throw new ForbiddenException('Unable to update profile');
    }
  }

  logout(dto: signDto) {
    return dto;
  }
}
