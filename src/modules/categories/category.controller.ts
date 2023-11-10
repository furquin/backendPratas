import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Auth, GuardRoute } from '../auth/auth.guard'
import { CategoryService } from './category.service'
import * as DTO from './dto'
import { AuthPresenter } from '../auth/presenters/auth.presenter'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@GuardRoute('categories.read')
	async getAll(@Auth() auth: AuthPresenter, @Query('filter') data?: string) {
		return await this.categoryService.getAll(auth, data)
	}

	@Get('/:id')
	@GuardRoute('categories.read')
	async findOneById(@Auth() auth: AuthPresenter, @Param('id') id: string) {
		return await this.categoryService.findOneById(auth, +id)
	}

	@Post()
	@GuardRoute('categories.create')
	async create(@Auth() auth: AuthPresenter, @Body() data: DTO.CreateCategoryDto) {
		return await this.categoryService.create(auth, data)
	}

	@Patch('/:id')
	@GuardRoute('categories.update')
	async update(@Auth() auth: AuthPresenter, @Param('id') id: string, @Body() data: DTO.UpdateCategoryDto) {
		return await this.categoryService.update(auth, +id, data)
	}

	@Delete('/:id')
	@GuardRoute('categories.delete')
	async remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
		return await this.categoryService.remove(auth, +id)
	}
}
