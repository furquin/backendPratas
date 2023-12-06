import { IStore } from 'src/modules/stores/interfaces/store.interface'
import { IUser } from '../interfaces/user.interface'
import { IRole } from 'src/modules/roles/interfaces/role.interface'

export class UserPresenter {
	id: number
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
	role: IRole
	roleId: number
	store: IStore
	active: boolean

	constructor(user: IUser) {
		this.id = user.id
		this.name = user.name
		this.email = user.email
		this.createdAt = user.createdAt
		this.updatedAt = user.updatedAt
		this.role = user.role
		this.store = user.store
		this.active = user.active
	}
}
