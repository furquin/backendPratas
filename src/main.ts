import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors()
	app.listen(process.env.PORT || 3000)
	useContainer(app.select(AppModule), { fallbackOnErrors: true })
	Logger.log(`Application is running`)
}
bootstrap()
