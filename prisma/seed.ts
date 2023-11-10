import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
	const roles: string[] = ['admin_sistema', 'admin_conta', 'operador']

	roles.forEach(
		async (role, index) =>
			await prisma.role.upsert({
				where: { slug: role },
				update: {},
				create: {
					id: index + 1,
					name: role,
					slug: role,
				},
			})
	)

	await prisma.store.upsert({
		where: { name: 'conta mãe' },
		update: {},
		create: {
			id: 1,
			name: 'conta mãe',
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
