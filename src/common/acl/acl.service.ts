import { ForbiddenException, Injectable } from '@nestjs/common'
import { AuthPresenter } from '../../modules/auth/presenters/auth.presenter'

export type actionName = keyof typeof ACLService.prototype.permissions
type action = actionName | actionName[]

@Injectable()
export class ACLService {
	permissions = {
		'users.read': ['admin_sistema'],
		'users.create': ['admin_sistema'],
		'users.update': ['admin_sistema'],
		'users.delete': ['admin_sistema'],

		'roles.read': ['admin_sistema'],
		'roles.create': ['admin_sistema'],
		'roles.update': ['admin_sistema'],
		'roles.delete': ['admin_sistema'],

		'products.read': ['admin_sistema', 'admin_conta'],
		'products.create': ['admin_sistema', 'admin_conta'],
		'products.update': ['admin_sistema', 'admin_conta'],
		'products.delete': ['admin_sistema', 'admin_conta'],
		'products.checkout': ['admin_sistema', 'admin_conta'],

		'categories.read': ['admin_sistema', 'admin_conta'],
		'categories.create': ['admin_sistema', 'admin_conta'],
		'categories.update': ['admin_sistema', 'admin_conta'],
		'categories.delete': ['admin_sistema', 'admin_conta'],

		'store.create': ['admin_sistema', 'admin_conta'],

		'payment-methods.read': ['admin_sistema', 'admin_conta'],
		'payment-methods.create': ['admin_sistema', 'admin_conta'],
		'payment-methods.update': ['admin_sistema', 'admin_conta'],
		'payment-methods.delete': ['admin_sistema', 'admin_conta'],
	}

	verifyPermission(action: action, auth: AuthPresenter, errorMessage?: string): boolean {
		if (Array.isArray(action)) {
			return action.some((action) => this.verifyPermission(action, auth, errorMessage)) || action.length === 0
		}

		const allowedRoles = this.permissions[action]

		if (!allowedRoles) {
			throw new ForbiddenException('Ação desconhecida.')
		}

		const has = allowedRoles.some((slug) => auth.user.role === slug)

		if (!has) {
			throw new ForbiddenException(errorMessage ?? 'Sem permissão.')
		}

		return true
	}

	safeVerifyPermission(action: action, auth: AuthPresenter): boolean {
		try {
			return this.verifyPermission(action, auth)
		} catch (error) {
			return false
		}
	}

	hasRole(auth: AuthPresenter, slug: string | string[]): boolean {
		if (Array.isArray(slug)) {
			return slug.some((slug) => this.hasRole(auth, slug)) || slug.length === 0
		}

		return auth.user.role === slug
	}
}
