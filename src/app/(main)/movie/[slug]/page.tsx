import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { PUBLIC_URL } from '@/config/url.config'

import { movieService } from '@/services/movie.service'

import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types'

import Movie from './Movie'

export const revalidate = 60

export async function generateStaticParams() {
	const movies = await movieService.getAll()

	const paths = movies.map(movie => {
		return {
			params: { slug: movie.slug }
		}
	})

	return paths
}

async function getMovie(params: TypeParamSlug) {
	try {
		const movie = await movieService.getBySlug(params?.slug as string)

		if (!movie) return redirect('/404')

		const dataSimilarMovies = await movieService.getByGenres(
			movie.genres.map(genre => genre.id)
		)

		const similarMovies: IGalleryItem[] = dataSimilarMovies.data
			.filter(m => m.id !== movie.id)
			.slice(0, 6)
			.map(m => ({
				name: m.title,
				poster: m.poster,
				link: PUBLIC_URL.movie(m.slug)
			}))

		return { movie, similarMovies }
	} catch (error) {
		return redirect('/404')
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { movie } = await getMovie(params)

	return {
		title: movie.title,
		openGraph: {
			images: {
				url: movie.bigPoster
			}
		}
	}
}

export default async function MoviePage({ params }: IPageSlugParam) {
	const { movie, similarMovies } = await getMovie(params)

	return (
		<Movie
			initialMovie={movie}
			similarMovies={similarMovies}
			slug={params.slug}
		/>
	)
}
