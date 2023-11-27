import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PaymentMethodsService } from './payment-methods.service'
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto'
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto'
import { GuardRoute } from '../auth/auth.guard'

@Controller('payment-methods')
export class PaymentMethodsController {
	constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

	@Post()
	@GuardRoute('payment-methods.create')
	create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
		return this.paymentMethodsService.create(createPaymentMethodDto)
	}

	@Get()
	@GuardRoute('payment-methods.read')
	findAll() {
		return this.paymentMethodsService.findAll()
	}

	@Get(':id')
	@GuardRoute('payment-methods.read')
	findOne(@Param('id') id: string) {
		return this.paymentMethodsService.findOne(+id)
	}

	@Patch(':id')
	@GuardRoute('payment-methods.update')
	update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
		return this.paymentMethodsService.update(+id, updatePaymentMethodDto)
	}

	@Delete(':id')
	@GuardRoute('payment-methods.delete')
	remove(@Param('id') id: string) {
		return this.paymentMethodsService.remove(+id)
	}
}
