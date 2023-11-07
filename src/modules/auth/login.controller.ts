import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginDto } from './dto/login.dto'
import { Public } from 'src/common/decorators/public.decorator'

@Controller('login')
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Post()
	@Public()
	@HttpCode(200)
	async login(@Body(new ValidationPipe()) authDto: LoginDto) {
		const payload = await this.loginService.signIn(authDto.email, authDto.password)
		return payload
	}
}
