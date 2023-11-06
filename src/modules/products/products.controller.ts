import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import * as DTO from './dto'
import { GuardRoute } from '../auth/auth.guard'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@GuardRoute('products.create')
	create(@Body() createProductsDto: DTO.CreateProductDto) {
		return this.productsService.create(createProductsDto)
	}

	@Get()
	@GuardRoute('products.read')
	findAll(@Query('filter') data?: string) {
		return this.productsService.findAll(data)
	}

	@Get('/:id')
	@GuardRoute('products.read')
	findOneById(@Param('id') id: string) {
		return this.productsService.findOneById(+id)
	}

	@Patch('/:id')
	@GuardRoute('products.update')
	update(@Param('id') id: string, @Body() updateProductsDto: DTO.UpdateProductDto) {
		return this.productsService.update(+id, updateProductsDto)
	}

	@Delete('/:id')
	@GuardRoute('products.delete')
	remove(@Param('id') id: string) {
		return this.productsService.remove(+id)
	}

	@Post('/:id/checkout')
	@GuardRoute('products.checkout')
	checkout(@Param('id') id: string, @Body() data: DTO.CheckoutDto) {
		return this.productsService.checkout(+id, data)
	}
}
