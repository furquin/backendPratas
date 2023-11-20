import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/modules/users/users.service'
import { BcryptService } from 'src/services/bcrypt/bcrypt.service'
import { JwtTokenService } from 'src/services/jwt/jwt.service'
import { UserPresenter } from '../users/presenters/user.presenter'
import * as DTO from './dto'
import { PrismaService } from 'src/database/prismaService'
import RabbitmqServer from 'src/services/rabbitMq/rabbitMq.service'

@Injectable()
export class LoginService {
	constructor(
		private readonly getUser: UsersService,
		private readonly jwtService: JwtTokenService,
		private readonly bcrypt: BcryptService,
		private readonly configService: ConfigService,
		private readonly bcryptService: BcryptService,
		private readonly prisma: PrismaService,
		private readonly rabbitmqServer: RabbitmqServer
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

	async register(data: DTO.RegisterDTO): Promise<{ user: UserPresenter; login: { token: string } }> {
		const user = await this.prisma.$transaction(async (trx) => {
			data.password = await this.bcrypt.hash(data.password)

			let store = await trx.store.findUnique({
				where: {
					name: data.storeName,
				},
			})

			if (store) {
				throw new BadRequestException('Store already exists')
			}

			store = await trx.store.create({
				data: {
					name: data.storeName,
				},
			})

			const user = await trx.user.create({
				data: {
					name: data.name,
					email: data.email,
					password: data.password,
					role: {
						connect: {
							id: data.roleId,
						},
					},
					store: {
						connect: {
							id: store.id,
						},
					},
				},
				include: {
					role: true,
					store: true,
				},
			})

			await this.rabbitmqServer.publishInQueue('mail', JSON.stringify({ template: 'new-register', email: user.email }))

			return user
		})

		return {
			user: new UserPresenter(user),
			login: {
				token: this.jwtService.createToken(user.id),
			},
		}
	}
}
