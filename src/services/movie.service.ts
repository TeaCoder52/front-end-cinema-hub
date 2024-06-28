import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

import { API_URL } from '@/config/api.config'

import { IMovie, IMovieEditInput } from '@/types/movie.types'

class MovieService {
	async getAll(searchTerm?: string) {
		const { data } = await axiosClassic.get<IMovie[]>(API_URL.movies(''), {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})

		return data
	}

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			API_URL.movies('/most-popular')
		)

		return movies
	}

	async getById(id: string) {
		return axiosWithAuth.get<IMovie>(API_URL.movies(`/by-id/${id}`))
	}

	async getBySlug(slug: string) {
		const { data } = await axiosClassic.get<IMovie>(
			API_URL.movies(`/by-slug/${slug}`)
		)

		return data
	}

	async getByActor(actorsId: string) {
		return axiosClassic.get<IMovie[]>(API_URL.movies(`/by-actor/${actorsId}`))
	}

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(API_URL.movies('/by-genres'), {
			genreIds
		})
	}

	async updateCountViews(slug: string) {
		return axiosClassic.put<string>(API_URL.movies('/update-count-views'), {
			slug
		})
	}

	async create() {
		return axiosWithAuth.post<string>(API_URL.movies(''))
	}

	async update(id: string, data: IMovieEditInput) {
		return axiosWithAuth.put<string>(API_URL.movies(`/${id}`), data)
	}

	async delete(id: string) {
		return axiosWithAuth.delete<string>(API_URL.movies(`/${id}`))
	}
}

export const movieService = new MovieService()
