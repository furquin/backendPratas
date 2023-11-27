import { IPaymentMethod } from '../interfaces/payment-method.interface'

export class PaymentMethodPresenter {
	id: number
	name: string
	constructor(paymentMethod: IPaymentMethod) {
		this.id = paymentMethod.id
		this.name = paymentMethod.name
	}
}
