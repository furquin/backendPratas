import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import * as DTO from './dto'
import { Auth, GuardRoute } from '../auth/auth.guard'
import { AuthPresenter } from '../auth/presenters/auth.presenter'

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@GuardRoute('products.create')
	create(@Auth() auth: AuthPresenter, @Body() createProductsDto: DTO.CreateProductDto) {
		return this.productsService.create(auth, createProductsDto)
	}

	@Get()
	@GuardRoute('products.read')
	findAll(@Auth() auth: AuthPresenter, @Query('filter') data?: string) {
		return this.productsService.findAll(auth, data)
	}

	@Get('/:id')
	@GuardRoute('products.read')
	findOneById(@Auth() auth: AuthPresenter, @Param('id') id: string) {
		return this.productsService.findOneById(auth, +id)
	}

	@Patch('/:id')
	@GuardRoute('products.update')
	update(@Auth() auth: AuthPresenter, @Param('id') id: string, @Body() updateProductsDto: DTO.UpdateProductDto) {
		return this.productsService.update(auth, +id, updateProductsDto)
	}

	@Delete('/:id')
	@GuardRoute('products.delete')
	remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
		return this.productsService.remove(auth, +id)
	}

	@Post('/checkout')
	@GuardRoute('products.checkout')
	checkout(@Auth() auth: AuthPresenter, @Body() data: DTO.CheckoutDto) {
		return this.productsService.checkout(auth, data)
	}
}
