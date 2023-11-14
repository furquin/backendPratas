import { IProduct } from '../interface/product.interface'

export class ProductPresenter {
	id: number
	name: string
	description: string
	price: number
	quantity: number
	createdAt: Date
	updatedAt: Date
	size: string
	barCode: string
	category?: string

	constructor(product: IProduct) {
		this.id = product.id
		this.name = product.name
		this.description = product.description
		this.price = product.price.toFixed(2) as unknown as number
		this.quantity = product.quantity
		this.createdAt = product.createdAt
		this.updatedAt = product.updatedAt
		this.size = product.size
		this.barCode = product.barCode
		this.category = product.category?.name
	}
}
