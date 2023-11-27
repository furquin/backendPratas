import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto'
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto'
import { PrismaService } from 'src/database/prismaService'
import { PaymentMethodPresenter } from './presenters/payment-method.presenter'

@Injectable()
export class PaymentMethodsService {
	constructor(
		private readonly prismService: PrismaService //
	) {}
	async create(data: CreatePaymentMethodDto) {
		const paymentMethod = await this.prismService.paymentMethod.create({
			data,
		})
		return new PaymentMethodPresenter(paymentMethod)
	}

	async findAll() {
		const paymentMethods = await this.prismService.paymentMethod.findMany()
		return paymentMethods.map((paymentMethod) => new PaymentMethodPresenter(paymentMethod))
	}

	async findOne(id: number) {
		const paymentMethod = await this.prismService.paymentMethod.findUnique({
			where: { id },
		})

		if (!paymentMethod) throw new NotFoundException('Payment method not found')

		return new PaymentMethodPresenter(paymentMethod)
	}

	async update(id: number, data: UpdatePaymentMethodDto) {
		await this.findOne(id)
		const paymentMethod = await this.prismService.paymentMethod.update({
			where: { id },
			data,
		})
		return new PaymentMethodPresenter(paymentMethod)
	}

	async remove(id: number) {
		await this.findOne(id)
		await this.prismService.paymentMethod.delete({
			where: { id },
		})
		return `Payment method ${id} deleted successfully`
	}
}
