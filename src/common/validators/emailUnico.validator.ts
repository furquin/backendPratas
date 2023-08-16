import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
@ValidatorConstraint({ async: true })
export class validationEmailUnico implements ValidatorConstraintInterface {
	constructor(private readonly userService: UsersService) {}
	async validate(email: string): Promise<boolean> {
		return !!!(await this.userService.findByEmail(email))
	}
}

export function userEmailExistsValidation(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'emailUsuarioUnico',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: validationEmailUnico,
		})
	}
}
