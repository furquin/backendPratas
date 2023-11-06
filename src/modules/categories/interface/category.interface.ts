import { IProduct } from '../../products/interface/product.interface'

export interface ICategory {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
	products?: IProduct[]
}
