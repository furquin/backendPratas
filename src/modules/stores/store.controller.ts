import { Body, Controller, Post } from '@nestjs/common'
import { StoreService } from './store.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { GuardRoute } from '../auth/auth.guard'

@Controller('store')
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	@Post()
	@GuardRoute('store.create')
	async create(@Body() data: CreateStoreDto) {
		return await this.storeService.create(data)
	}
}
