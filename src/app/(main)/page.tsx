import type { Metadata } from 'next'

import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { PUBLIC_URL } from '@/config/url.config'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'
import { getMovieWordWithEnding } from '@/utils/string/getMovieWordWithEnding'

import Home from './Home'

export const metadata: Metadata = {
	title: 'Смотреть фильмы онлайн'
}

export const revalidate = 60

async function getContent() {
	const movies = await movieService.getAll()

	const slides: ISlide[] = movies
		.map(movie => ({
			id: movie.id,
			link: PUBLIC_URL.movie(movie.slug),
			subTitle: getGenresList(movie.genres),
			title: movie.title,
			bigPoster: movie.bigPoster
		}))
		.slice(0, 3)

	const dataTrendingMovies = await movieService.getMostPopularMovies()

	const trendingMovies: IGalleryItem[] = dataTrendingMovies
		.slice(0, 6)
		.map(movie => ({
			name: movie.title,
			poster: movie.poster,
			link: PUBLIC_URL.movie(movie.slug),
			content: {
				title: movie.title,
				subTitle: movie.genres[0].name
			}
		}))

	const dataActors = await actorService.getAll()

	const actors: IGalleryItem[] = dataActors.slice(0, 6).map(actor => ({
		name: actor.name,
		poster: actor.photoUrl,
		link: PUBLIC_URL.actor(actor.slug),
		content: {
			title: actor.name,
			subTitle: getMovieWordWithEnding(actor.movies.length)
		}
	}))

	return { slides, trendingMovies, actors }
}

export default async function HomePage() {
	const { slides, trendingMovies, actors } = await getContent()


	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}
