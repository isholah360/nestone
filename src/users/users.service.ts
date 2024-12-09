import { ForbiddenException, Injectable } from '@nestjs/common';
import { userDto } from './userDto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}
  getHello(): string {
    return 'Hello users!';
  }
  async reg(dto: userDto) {
    const hashPw = await argon2.hash(dto.password);

    try {
         const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPw,
        name: 'ishola',
      },
    });
    
    delete newUser.password;
    return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Acc taken');
      }
    }

   
 
  }
  async login(dto: userDto) {
    const User = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!User) throw new ForbiddenException('Wrong credential');
    const truePw = await argon2.verify(User.password, dto.password);
    if (!truePw) throw new ForbiddenException('Wrong credential');
    delete User.password;
    return this.signToken(User.id, User.email);
  }

  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const token = await this.jwt.signAsync(payload, {
      secret: 'ishola233',
      expiresIn: '15m',
    });
    return { access_token: token };
  }

  logout(dto: userDto) {
    console.log(dto);
    return { dto };
  }
}
