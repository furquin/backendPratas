import { IUser } from 'src/modules/users/interfaces/user.interface'

export interface IStore {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
	users?: IUser[]
}
