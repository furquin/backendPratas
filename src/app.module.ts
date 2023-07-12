import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { LoginModule } from './login/login.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		UsersModule,
		ProductsModule,
		LoginModule,
		JwtModule.register({ global: true }),
		ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
