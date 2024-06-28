import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { genreService } from '@/services/genre.service'
import { movieService } from '@/services/movie.service'

import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types'

export const revalidate = 60

export async function generateStaticParams() {
	const genres = await genreService.getAll()

	const paths = genres.map(genre => {
		return {
			params: { slug: genre.slug }
		}
	})

	return paths
}

async function getMovies(params: TypeParamSlug) {
	try {
		const { data: genre } = await genreService.getBySlug(
			params?.slug as string
		)

		if (!genre) return redirect('/404')

		const { data: movies } = await movieService.getByGenres([genre.id])

		return { genre, movies }
	} catch (error) {
		return redirect('/404')
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { genre, movies } = await getMovies(params)

	return {
		title: genre.name,
		description: genre.description,
		openGraph: {
			images: {
				url: movies[0].poster
			},
			description: genre.description
		}
	}
}

export default async function GenrePage({ params }: IPageSlugParam) {
	const { genre, movies } = await getMovies(params)

	return (
		<div className='px-6'>
			<Catalog
				title={genre.name}
				description={genre.description}
				movies={movies}
			/>
		</div>
	)
}
