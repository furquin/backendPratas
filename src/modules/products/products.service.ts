import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prismaService'
import * as DTO from './dto'
import { ProductPresenter } from './presenters/product.presenter'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(data: DTO.CreateProductDto): Promise<ProductPresenter> {
		let product = await this.prisma.product.findFirst({
			where: {
				barCode: data.barCode,
			},
		})
		if (product) throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)

		product = await this.prisma.product.create({
			data,
			include: {
				category: true,
			},
		})

		return new ProductPresenter(product)
	}

	async findAll(data: string): Promise<ProductPresenter[]> {
		const query: Prisma.ProductFindManyArgs = { include: { category: true } }

		if (data) {
			query.where = {
				OR: [{ name: { contains: data } }, { barCode: { contains: data } }, { description: { contains: data } }],
			}
		}
		const products = await this.prisma.product.findMany(query)

		if (!products) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return products.map((product) => new ProductPresenter(product))
	}

	async findOneById(id: number): Promise<ProductPresenter> {
		const product = await this.prisma.product.findFirst({
			where: {
				id,
			},
			include: {
				category: true,
			},
		})

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return new ProductPresenter(product)
	}

	async remove(id: number): Promise<string> {
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

	async update(id: number, data: DTO.UpdateProductDto): Promise<ProductPresenter> {
		const product = await this.prisma.product.findFirst({ where: { id } })

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return new ProductPresenter(
			await this.prisma.product.update({
				where: { id },
				include: { category: true },
				data,
			})
		)
	}

	async checkout(id: number, data: DTO.CheckoutDto) {
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
