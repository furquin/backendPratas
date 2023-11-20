import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/database/prismaService'
import { UsersService } from 'src/modules/users/users.service'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { JwtTokenService } from 'src/services/jwt/jwt.service'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import RabbitmqServer from 'src/services/rabbitMq/rabbitMq.service'
@Module({
	imports: [],
	controllers: [LoginController],
	providers: [
		LoginService,
		UsersService,
		JwtTokenService,
		ConfigService,
		BcryptService,
		PrismaService,
		JwtService,
		RabbitmqServer,
	],
	exports: [UsersService, JwtTokenService, ConfigService, BcryptService, PrismaService, JwtService],
})
export class LoginModule {}
