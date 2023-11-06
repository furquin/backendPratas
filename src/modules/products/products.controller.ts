import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import * as DTO from './dto'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductsDto: DTO.CreateProductDto) {
		return this.productsService.create(createProductsDto)
	}

	@Get()
	findAll(@Query('filter') data?: string) {
		return this.productsService.findAll(data)
	}

	@Get('/:id')
	findOneById(@Param('id') id: string) {
		return this.productsService.findOneById(+id)
	}

	@Patch('/:id')
	update(@Param('id') id: string, @Body() updateProductsDto: DTO.UpdateProductDto) {
		return this.productsService.update(+id, updateProductsDto)
	}

	@Delete('/:id')
	remove(@Param('id') id: string) {
		return this.productsService.remove(+id)
	}

	@Post('/:id/checkout')
	checkout(@Param('id') id: string, @Body() data: DTO.CheckoutDto) {
		return this.productsService.checkout(+id, data)
	}
}
