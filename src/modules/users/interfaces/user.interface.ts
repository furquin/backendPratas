import { IRole } from 'src/modules/roles/interfaces/role.interface'

export interface IUser {
	id: number
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	roleId: number
	role: IRole
}
