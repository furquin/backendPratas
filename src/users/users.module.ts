import { Global, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/database/prismaService'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'

@Global()
@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService, BcryptService],
	exports: [UsersService, PrismaService, BcryptService],
})
export class UsersModule {}
