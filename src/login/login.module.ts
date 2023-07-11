import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersService } from 'src/users/users.service';
import { JwtTokenService } from 'src/services/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { PrismaService } from 'src/database/prismaService';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, UsersService, JwtTokenService, ConfigService, BcryptService, PrismaService, JwtService],
  exports: [UsersService, JwtTokenService, ConfigService, BcryptService, PrismaService, JwtService],
})
export class LoginModule {}
