import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string

	@IsString({ message: 'Description must be a string' })
	@IsOptional()
	description?: string

	@IsDecimal({}, { message: 'Price must be a decimal' })
	@IsNotEmpty({ message: 'Price is required' })
	price: number

	@IsNumber({}, { message: 'Quantity must be a number' })
	@IsNotEmpty({ message: 'Quantity is required' })
	quantity: number

	@IsNumber({}, { message: 'Category id must be a number' })
	@IsOptional()
	categoryId?: number

	@IsOptional()
	@IsString({ message: 'Image must be a string' })
	image?: string

	@IsString({ message: 'Bar code must be a string' })
	@IsNotEmpty({ message: 'Bar code is required' })
	barCode: string

	@IsString({ message: 'Size must be a string' })
	@IsOptional()
	size?: string
}
