import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prismaService'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateProductDto): Promise<CreateProductDto> {
		const product = await this.prisma.product.findFirst({
			where: {
				barCode: data.barCode,
			},
		})

		if (!product) {
			return await this.prisma.product.create({
				data,
			})
		}

		throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)
	}

	async findAll(): Promise<CreateProductDto[]> {
		return await this.prisma.product.findMany()
	}

	async findFilters(data: object) {
		const product = await this.prisma.product.findMany({
			where: {
				...data,
			},
		})

		if (!product) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

		return product
	}

	async remove(barCode: string) {
		const product = await this.prisma.product.findFirst({
			where: {
				barCode: barCode,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		await this.prisma.product.delete({
			where: {
				barCode: barCode,
			},
		})
		return `Product ${product.name} deleted`
	}
}
