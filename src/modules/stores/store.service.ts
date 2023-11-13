import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { CreateStoreDto } from './dto/create-store.dto'

@Injectable()
export class StoreService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(data: CreateStoreDto): Promise<any> {
		const store = await this.prismaService.store.findUnique({
			where: {
				name: data.name,
			},
		})

		if (store) {
			throw new BadRequestException('Store already exists')
		}

		return await this.prismaService.store.create({
			data: {
				name: data.name,
			},
		})
	}
}
