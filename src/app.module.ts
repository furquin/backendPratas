import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { LoginModule } from './modules/auth/login.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'

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
