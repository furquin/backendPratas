import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IUser } from 'src/modules/users/interfaces/user.interface'
import { UsersService } from 'src/modules/users/users.service'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { JwtTokenService } from 'src/services/jwt/jwt.service'

@Injectable()
export class LoginService {
	constructor(
		private readonly getUser: UsersService,
		private readonly jwtService: JwtTokenService,
		private readonly configService: ConfigService,
		private readonly bcryptService: BcryptService
	) {}
	async signIn(email: string, password: string): Promise<{ user: IUser; login: { token: string } }> {
		const user = await this.getUser.findByEmail(email)

		if (user) {
			const match = await this.bcryptService.compare(password, user.password)
			if (match) {
				const payload = { uid: user.id }
				const secret = this.configService.get<string>('JWT_SECRET')
				const expireIn = this.configService.get<string>('JWT_EXPIRATION_TIME')
				const token = this.jwtService.createToken(payload, secret, expireIn)
				return { user, login: { token } }
			}
		}
		throw new UnauthorizedException('Email e/ou password inválido!')
	}
}
