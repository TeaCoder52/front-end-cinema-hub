import { IMovie } from './movie.types'

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN'
}

export interface IUser {
	id: string
	name: string
	email: string
	avatarPath: string
	role: UserRole
	isHasPremium: boolean
	favorites: IMovie[]
}

export interface IUserEditInput
	extends Pick<IUser, 'name' | 'email' | 'role'> {}
