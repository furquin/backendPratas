import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prismaService'
import { CategoryPresenter } from './presenters/category.presenter'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as DTO from './dto'
import { AuthPresenter } from '../auth/presenters/auth.presenter'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAll(auth: AuthPresenter, data?: string): Promise<CategoryPresenter[]> {
		const query: Prisma.CategoryFindManyArgs = {}
		if (auth.user.role.slug !== 'admin_sistema') {
			query.where = {
				storeId: auth.user.store.id,
			}
		}
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

	async findOneById(auth: AuthPresenter, id: number): Promise<CategoryPresenter> {
		const query: Prisma.CategoryFindFirstArgs = { where: { id }, include: { products: true } }
		if (auth.user.role.slug !== 'admin_sistema') {
			query.where = {
				store: {
					id: auth.user.store.id,
				},
			}
		}
		const category = await this.prismaService.category.findFirst(query)

		if (!category) throw new NotFoundException('Categoria não encontrada.')

		return new CategoryPresenter(category)
	}

	async create(auth: AuthPresenter, data: DTO.CreateCategoryDto): Promise<CategoryPresenter> {
		const category = await this.prismaService.category.create({
			data: {
				...data,
				store: {
					connect: {
						id: auth.user.store.id,
					},
				},
			},
		})

		return new CategoryPresenter(category)
	}

	async update(auth: AuthPresenter, id: number, data: DTO.UpdateCategoryDto): Promise<CategoryPresenter> {
		const category = await this.prismaService.category.update({
			where: { id, storeId: auth.user.store.id },
			data,
		})

		return new CategoryPresenter(category)
	}

	async remove(auth: AuthPresenter, id: number): Promise<string> {
		await this.findOneById(auth, id)
		await this.prismaService.category.delete({
			where: { id, storeId: auth.user.store.id },
		})

		return 'Categoria removida com sucesso!'
	}
}
