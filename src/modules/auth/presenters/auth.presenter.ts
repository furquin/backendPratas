import { UserPresenter } from '../../users/presenters/user.presenter'

export class AuthPresenter {
	user: UserPresenter
	role: string

	constructor(input: any) {
		this.user = new UserPresenter(input.user)
		this.role = input.role
	}
}
