import { Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { userEmailExistsValidation } from 'src/common/validators/emailUnico.validator'
export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsEmail()
	@IsNotEmpty()
	@userEmailExistsValidation({ message: 'User already exists' })
	email: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string
}
