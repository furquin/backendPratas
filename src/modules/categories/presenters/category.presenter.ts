import { ICategory } from '../interface/category.interface'

export class CategoryPresenter {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date

	constructor(data: ICategory) {
		this.id = data.id
		this.name = data.name
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}
