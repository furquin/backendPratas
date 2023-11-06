import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/modules/users/users.service'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { JwtTokenService } from 'src/services/jwt/jwt.service'
import { UserPresenter } from '../users/presenters/user.presenter'

@Injectable()
export class LoginService {
	constructor(
		private readonly getUser: UsersService,
		private readonly jwtService: JwtTokenService,
		private readonly configService: ConfigService,
		private readonly bcryptService: BcryptService
	) {}
	async signIn(email: string, password: string): Promise<{ user: UserPresenter; login: { token: string } }> {
		const user = await this.getUser.findByEmail(email)
		if (!user) throw new NotFoundException('Usuário não encontrado')

		if (user.email === 'admin@admin.com') {
			const adminPassword = this.configService.get<string>('ADMIN_PASSWORD')
			if (password !== adminPassword) throw new UnauthorizedException('Email e/ou password inválido!')
		} else {
			const isPasswordValid = await this.bcryptService.compare(password, user.password)
			if (!isPasswordValid) throw new UnauthorizedException('Email e/ou password inválido!')
		}

		return { user: new UserPresenter(user), login: { token: this.jwtService.createToken(user.id) } }
	}
}
