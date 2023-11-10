import { IStore } from 'src/modules/stores/interfaces/store.interface'
import { IUser } from '../interfaces/user.interface'

export class UserPresenter {
	id: number
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
	role: string
	store: IStore

	constructor(user: IUser) {
		this.id = user.id
		this.name = user.name
		this.email = user.email
		this.createdAt = user.createdAt
		this.updatedAt = user.updatedAt
		this.role = user.role.name
		this.store = user.store
	}
}
