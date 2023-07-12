import { Global, Module } from '@nestjs/common'
import { JwtModule as Jwt } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtTokenService } from './jwt.service'

@Global()
@Module({
	imports: [
		Jwt.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') },
			}),
		}),
	],
	providers: [JwtTokenService],
	exports: [JwtTokenService],
})
export class JwtModule {}
