import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class CheckoutProductDto {
	@IsNotEmpty({ message: 'Product id is required' })
	@IsNumber({}, { message: 'Product id must be a number' })
	id: number

	@IsNotEmpty({ message: 'Quantity is required' })
	@IsNumber({}, { message: 'Quantity must be a number' })
	quantity: number
}
export class CheckoutDto {
	@IsNotEmpty({ message: 'Payment id is required' })
	@IsNumber({}, { message: 'Payment id must be a number' })
	paymentId: number

	@IsBoolean({ message: 'installment must be an booleano' })
	installment: boolean

	@IsNumber({}, { message: 'installmentsNumber must be a number' })
	@IsOptional()
	installmentsNumber?: number

	@IsArray({ message: 'invoiceStatus must be an array' })
	@IsOptional()
	@IsString({ each: true, message: 'invoiceStatus must be a string' })
	invoiceStatus?: string[]

	@IsNumber({}, { message: 'totalPriceOrder must be a decimal' })
	@IsNotEmpty({ message: 'totalPriceOrder is required' })
	totalPriceOrder: number

	@IsArray({ message: 'Products must be an array' })
	@ValidateNested({ each: true })
	@Type(() => CheckoutProductDto)
	products: CheckoutProductDto[]
}
