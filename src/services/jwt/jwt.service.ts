import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtTokenService {
	constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

	async checkToken(token: string): Promise<any> {
		const decode = await this.jwtService.verifyAsync(token)
		return decode
	}
	createToken(payload: number): string {
		const secret = this.configService.get<string>('JWT_SECRET')
		const expiresIn = this.configService.get<string>('JWT_EXPIRATION_TIME')
		return this.jwtService.sign(
			{ id: payload },
			{
				secret,
				expiresIn,
			}
		)
	}
}
