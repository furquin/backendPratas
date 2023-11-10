import { IStore } from 'src/modules/stores/interfaces/store.interface'
import { UserPresenter } from '../../users/presenters/user.presenter'

export class AuthPresenter {
	user: UserPresenter
	role: string
	store: IStore

	constructor(input: any) {
		this.user = new UserPresenter(input.user)
		this.role = input.role
	}
}
