import { IRole } from 'src/modules/roles/interfaces/role.interface'
import { IStore } from 'src/modules/stores/interfaces/store.interface'

export interface IUser {
	id: number
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	roleId: number
	storeId: number
	store: IStore
	role: IRole
}
