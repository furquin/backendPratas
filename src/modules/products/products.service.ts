import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prismaService'
import * as DTO from './dto'
import { ProductPresenter } from './presenters/product.presenter'
import { Prisma } from '@prisma/client'
import { AuthPresenter } from '../auth/presenters/auth.presenter'

@Injectable()
export class ProductsService {
	constructor(
		private readonly prismaService: PrismaService //
	) {}

	async create(auth: AuthPresenter, data: DTO.CreateProductDto): Promise<ProductPresenter> {
		let product = await this.prismaService.product.findFirst({
			where: {
				barCode: data.barCode,
			},
		})
		if (product) throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)

		const query: Prisma.ProductCreateArgs = {
			data: {
				...data,
				store: {
					connect: {
						id: auth.user.store.id,
					},
				},
			},
			include: {
				category: true,
			},
		}
		if (data.categoryName) {
			query.data.category = {
				connect: {
					id: data.categoryName,
				},
			}
		}

		product = await this.prismaService.product.create(query)

		return new ProductPresenter(product)
	}

	async findAll(auth: AuthPresenter, data: string): Promise<ProductPresenter[]> {
		console.log(auth)

		const query: Prisma.ProductFindManyArgs = { include: { category: true } }
		if (auth.user.role !== 'admin_sistema') query.where = { storeId: auth.user.store.id }

		if (data) {
			query.where = {
				OR: [{ name: { contains: data } }, { barCode: { contains: data } }, { description: { contains: data } }],
			}
		}
		const products = await this.prismaService.product.findMany(query)

		if (!products) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return products.map((product) => new ProductPresenter(product))
	}

	async findOneById(auth: AuthPresenter, id: number): Promise<ProductPresenter> {
		const query: Prisma.ProductFindManyArgs = { include: { category: true } }
		if (auth.user.role !== 'admin_sistema') query.where = { storeId: auth.user.store.id }
		query.where = { id }
		const product = await this.prismaService.product.findFirst(query)

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return new ProductPresenter(product)
	}

	async remove(auth: AuthPresenter, id: number): Promise<string> {
		const query: Prisma.ProductFindManyArgs = { where: { id } }
		if (auth.user.role !== 'admin_sistema') query.where = { storeId: auth.user.store.id }

		const product = await this.prismaService.product.findFirst(query)

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
		await this.prismaService.product.delete({ where: { id } })
		return `Product ${product.name} deleted`
	}

	async update(auth: AuthPresenter, id: number, data: DTO.UpdateProductDto): Promise<ProductPresenter> {
		const query: Prisma.ProductFindManyArgs = { where: { id } }
		if (auth.user.role !== 'admin_sistema') query.where = { storeId: auth.user.store.id }
		const product = await this.prismaService.product.findFirst(query)

		if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

		return new ProductPresenter(
			await this.prismaService.product.update({
				where: { id, storeId: auth.user.store.id },
				include: { category: true },
				data,
			})
		)
	}

	async checkout(auth: AuthPresenter, data: DTO.CheckoutDto) {
		await this.prismaService.$transaction(async (trx) => {
			const order = await trx.order.create({
				data: {
					store: {
						connect: {
							id: auth.user.store.id,
						},
					},
					user: {
						connect: {
							id: auth.user.id,
						},
					},
					payment: {
						connect: {
							id: data.paymentId,
						},
					},
					installment: data.installment,
					installmentsNumber: data.installmentsNumber,
					totalPriceOrder: data.totalPriceOrder,
				},
			})

			for (const product of data.products) {
				await this.checkoutProduct(trx, order.id, product)
			}

			for (let installment = 1; installment <= data.installmentsNumber; installment += 1) {
				await trx.invoice.create({
					data: {
						order: {
							connect: {
								id: order.id,
							},
						},
						status: data.invoiceStatus.length > 1 ? data.invoiceStatus[installment - 1] : 'pending',
						price: data.totalPriceOrder / data.installmentsNumber,
					},
				})
			}
		})

		return 'Order created successfully'
	}

	async checkoutProduct(transaction: any, orderId: number, product: DTO.CheckoutProductDto) {
		const currentProduct = await transaction.product.findFirst({
			where: {
				id: product.id,
			},
		})
		if (currentProduct.quantity < product.quantity)
			throw new HttpException('Product quantity is less than the requested', HttpStatus.BAD_REQUEST)

		await transaction.product.update({
			where: {
				id: product.id,
			},
			data: {
				quantity: currentProduct.quantity - product.quantity,
			},
		})

		await transaction.orderProduct.create({
			data: {
				order: {
					connect: {
						id: orderId,
					},
				},
				product: {
					connect: {
						id: product.id,
					},
				},
				quantity: product.quantity,
				price: currentProduct.price,
				totalPriceProduct: product.quantity * Number(currentProduct.price),
			},
		})
	}
}
