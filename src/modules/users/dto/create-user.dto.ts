import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'
import { userEmailExistsValidation } from 'src/common/validators/emailUnico.validator'
export class CreateUserDto {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string

	@IsEmail({}, { message: 'Invalid email' })
	@IsNotEmpty({ message: 'Email is required' })
	@userEmailExistsValidation({ message: 'User already exists' })
	email: string

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters' })
	password: string

	@IsNotEmpty({ message: 'Role is required' })
	@IsNumber({}, { message: 'Role must be a number' })
	roleId: number
}
