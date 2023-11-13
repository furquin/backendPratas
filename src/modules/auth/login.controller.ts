import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common'
import { LoginService } from './login.service'
import * as DTO from './dto'
import { Public } from 'src/common/decorators/public.decorator'

@Controller()
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Post('login')
	@Public()
	@HttpCode(200)
	async login(@Body(new ValidationPipe()) authDto: DTO.LoginDto) {
		const payload = await this.loginService.signIn(authDto.email, authDto.password)
		return payload
	}

	@Post('register')
	@Public()
	async register(@Body() data: DTO.RegisterDTO) {
		const payload = await this.loginService.register(data)
		return payload
	}
}
