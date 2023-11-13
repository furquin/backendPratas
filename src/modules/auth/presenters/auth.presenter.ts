import { UserPresenter } from '../../users/presenters/user.presenter'

export class AuthPresenter {
	user: UserPresenter

	constructor(input: UserPresenter) {
		this.user = input
	}
}
