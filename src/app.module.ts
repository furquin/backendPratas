import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { LoginModule } from './modules/auth/login.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'
import { ACLModule } from './common/acl/acl.module'
import { CategoryModule } from './modules/categories/category.module'
import { StoreModule } from './modules/stores/store.module'
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module'

@Module({
	imports: [
		UsersModule,
		ACLModule,
		ProductsModule,
		CategoryModule,
		LoginModule,
		StoreModule,
		JwtModule.register({ global: true }),
		ConfigModule.forRoot({ isGlobal: true }),
		PaymentMethodsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
