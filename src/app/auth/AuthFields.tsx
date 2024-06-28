import { FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/field/Field'

import { IAuthForm } from '@/types/auth.types'

import { validEmail } from './valid-email'

interface IAuthFields {
	register: UseFormRegister<IAuthForm>
	errors: {
		name?: FieldError
		email?: FieldError
		password?: FieldError
	}
	isLoginForm: boolean
}

const AuthFields: FC<IAuthFields> = ({ register, errors, isLoginForm }) => {
	return (
		<>
			{!isLoginForm && (
				<Field
					{...register('name', {
						required: 'Имя обязательно',
						minLength: {
							value: 1,
							message: 'Пожалуйста введите имя'
						}
					})}
					placeholder='Имя'
					error={errors.name}
				/>
			)}
			<Field
				{...register('email', {
					required: 'Email обязателен',
					pattern: {
						value: validEmail,
						message: 'Пожалуйста введите корректный email'
					}
				})}
				placeholder='Email'
				error={errors.email}
			/>
			<Field
				{...register('password', {
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Пароль должен содержать 6 символов'
					}
				})}
				type='password'
				placeholder='Пароль'
				error={errors.password}
			/>
		</>
	)
}

export default AuthFields
