import { IUser } from './user.types'

export interface IReview {
	id: string
	createdAt: string
	user: IUser
	text: string
	rating: number
}
