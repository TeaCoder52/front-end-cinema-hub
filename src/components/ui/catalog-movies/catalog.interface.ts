import { IMovie } from '@/types/movie.types'

export interface ICatalog {
	title?: string
	description?: string
	movies: IMovie[]
	isLoading?: boolean
}
