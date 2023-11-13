import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
	const roles: string[] = ['admin_sistema', 'admin_conta', 'operador']
	const paymentMethods: string[] = ['Dinheiro', 'Cartão', 'Pix', 'Boleto']

	for (const role in roles) {
		await prisma.role.upsert({
			where: { slug: role },
			update: {},
			create: {
				id: roles.indexOf(role) + 1,
				name: role,
				slug: role,
			},
		})
	}

	await prisma.store.upsert({
		where: { name: 'conta mãe' },
		update: {},
		create: {
			id: 1,
			name: 'conta mãe',
		},
	})

	await prisma.user.upsert({
		where: { email: 'admin@admin.com' },
		update: {},
		create: {
			name: 'Admin Geral',
			email: 'admin@admin.com',
			password: 'Admin123',
			roleId: 1,
			storeId: 1,
		},
	})

	await prisma.category.upsert({
		where: { name: 'Sem categoria' },
		update: {},
		create: {
			name: 'Sem categoria',
			storeId: 1,
		},
	})

	for (const paymentMethod of paymentMethods) {
		const paymentMethodData: Prisma.PaymentMethodCreateInput = {
			name: paymentMethod,
		}

		await prisma.paymentMethod.upsert({
			where: { name: paymentMethod },
			update: {},
			create: paymentMethodData,
		})
	}
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
