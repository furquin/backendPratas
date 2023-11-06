import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prismaService'
import { CategoryPresenter } from './presenters/category.presenter'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as DTO from './dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(data?: string): Promise<CategoryPresenter[]> {
		const query: Prisma.CategoryFindManyArgs = {}

		if (data) {
			query.where = {
				name: {
					contains: data,
					mode: 'insensitive',
				},
			}
		}
		const categories = await this.prismaService.category.findMany(query)

		return categories.map((category) => new CategoryPresenter(category))
	}

	async findOneById(id: number): Promise<CategoryPresenter> {
		const category = await this.prismaService.category.findUnique({
			where: { id },
		})

		if (!category) throw new NotFoundException('Categoria não encontrada.')

		return new CategoryPresenter(category)
	}

	async create(data: DTO.CreateCategoryDto): Promise<CategoryPresenter> {
		const category = await this.prismaService.category.create({
			data,
		})

		return new CategoryPresenter(category)
	}

	async update(id: number, data: DTO.UpdateCategoryDto): Promise<CategoryPresenter> {
		const category = await this.prismaService.category.update({
			where: { id },
			data,
		})

		return new CategoryPresenter(category)
	}

	async remove(id: number): Promise<string> {
		await this.findOneById(id)
		await this.prismaService.category.delete({
			where: { id },
		})

		return 'Categoria removida com sucesso!'
	}
}
