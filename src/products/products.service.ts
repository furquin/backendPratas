import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prismaService'
import * as DTO from './dto'

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(data: DTO.CreateProductDto): Promise<any> {
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

	async findAll(data: string): Promise<any> {
		const product = await this.prisma.product.findMany({
			where: {
				OR: [{ name: { contains: data } }, { barCode: { contains: data } }, { description: { contains: data } }],
			},
		})
		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return product
	}

	async findOneById(id: string): Promise<any> {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return product
	}

	async remove(id: string) {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		await this.prisma.product.delete({
			where: {
				id,
			},
		})
		return `Product ${product.name} deleted`
	}

	async update(id: string, data: any) {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return await this.prisma.product.update({
			where: {
				id,
			},
			data,
		})
	}

	async checkout(id: string, data: DTO.CheckoutDto) {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		if (product.quantity < data.quantity)
			throw new HttpException('Product quantity is less than the requested', HttpStatus.BAD_REQUEST)

		return await this.prisma.product.update({
			where: {
				id,
			},
			data: {
				quantity: product.quantity - data.quantity,
			},
		})
	}
}
