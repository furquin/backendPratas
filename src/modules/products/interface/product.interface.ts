import { Decimal } from '@prisma/client/runtime/library'
import { ICategory } from 'src/modules/categories/interface/category.interface'

export interface IProduct {
	id: number
	name: string
	description: string
	price: Decimal
	quantity: number
	createdAt: Date
	updatedAt: Date
	size: string
	barCode: string
	image: string
	categoryId: number
	category?: ICategory
}
