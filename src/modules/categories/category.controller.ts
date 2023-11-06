import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { GuardRoute } from '../auth/auth.guard'
import { CategoryService } from './category.service'
import * as DTO from './dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@GuardRoute('categories.read')
	async getAll(@Query('filter') data?: string) {
		return await this.categoryService.getAll(data)
	}

	@Get('/:id')
	@GuardRoute('categories.read')
	async findOneById(@Param('id') id: string) {
		return await this.categoryService.findOneById(+id)
	}

	@Post()
	@GuardRoute('categories.create')
	async create(@Body() data: DTO.CreateCategoryDto) {
		return await this.categoryService.create(data)
	}

	@Patch('/:id')
	@GuardRoute('categories.update')
	async update(@Param('id') id: string, @Body() data: DTO.UpdateCategoryDto) {
		return await this.categoryService.update(+id, data)
	}

	@Delete('/:id')
	@GuardRoute('categories.delete')
	async remove(@Param('id') id: string) {
		return await this.categoryService.remove(+id)
	}
}
