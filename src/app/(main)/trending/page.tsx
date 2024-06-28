import type { Metadata } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { movieService } from '@/services/movie.service'

export const metadata: Metadata = {
	title: 'Популярные фильмы'
}

export const revalidate = 60

async function getMovies() {
	const data = await movieService.getMostPopularMovies()
	return data
}

export default async function ExplorerPage() {
	const data = await getMovies()

	return (
		<div className='px-6'>
			<Catalog
				title='Популярные фильмы'
				description='Актуальные фильмы в отличном качестве: легально, безопасно, без рекламы.'
				movies={data}
			/>
		</div>
	)
}
