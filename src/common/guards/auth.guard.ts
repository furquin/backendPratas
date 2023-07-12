import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UseGuards,
	applyDecorators,
	createParamDecorator,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { UsersService } from 'src/users/users.service'

export function GuardRoute() {
	return applyDecorators(UseGuards(AuthGuard))
}

export const Auth = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	return request.auth
})

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly user: UsersService,
		private readonly configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		const token = this.extractTokenFromHeader(request)

		if (!token) {
			throw new ForbiddenException()
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.getOrThrow<string>('JWT_SECRET'),
			})

			const auth = await this.getAuth(payload.uid)

			request['auth'] = auth
		} catch (e) {
			throw new ForbiddenException(e instanceof ForbiddenException ? e.message : 'Token inválido.')
		}

		return true
	}

	private async getAuth(userId: number) {
		const user = await this.user.findOne(userId)

		if (!user) {
			throw new ForbiddenException('Usuário não encontrado.')
		}

		return user
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
