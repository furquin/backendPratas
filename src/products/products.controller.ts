import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductsDto: CreateProductDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/filter')
  findOne(@Body() data: object) {
    return this.productsService.findOne(data);
  }

  @Delete(':bar_code')
  remove(@Param('bar_code') bar_code: string) {
    return this.productsService.remove(bar_code);
  }
}
