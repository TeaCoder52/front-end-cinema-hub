import { IUser } from './user.types'

export interface IAuthForm {
	name?: string
	email: string
	password: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
