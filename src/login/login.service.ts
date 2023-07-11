import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/services/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class LoginService {
	constructor(
		private readonly getUser: UsersService,
		private readonly jwtService: JwtTokenService,
		private readonly configService: ConfigService,
		private readonly bcryptService: BcryptService,
	) { }
	async signIn(email: string, password: string): Promise<{user:IUser, login: { token: string }}> {
		const user = await this.getUser.findByEmail(email);

		if (user) {
			
			const match = await this.bcryptService.compare(password, user.password);
			if (match) {
				const payload = { uid: user.id };
				const secret = this.configService.get<string>('JWT_SECRET');
				const expireIn = this.configService.get<string>('JWT_EXPIRATION_TIME');
				const token = this.jwtService.createToken(payload, secret, expireIn);
				delete user.password;
				return { user, login: { token } };
			}
		}
		throw new UnauthorizedException('Email e/ou password inválido!');
	}
}
