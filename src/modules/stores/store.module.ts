import { Module } from '@nestjs/common'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'
import { JwtTokenService } from 'src/services/jwt/jwt.service'
@Module({
	imports: [],
	controllers: [StoreController],
	providers: [StoreService, JwtTokenService],
	exports: [StoreService, JwtTokenService],
})
export class StoreModule {}
