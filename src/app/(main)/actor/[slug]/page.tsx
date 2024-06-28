import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import { IPageSlugParam, TypeParamSlug } from '@/types/page-params.types'

export const revalidate = 60

export async function generateStaticParams() {
	const actors = await actorService.getAll()

	const paths = actors.map(actor => {
		return {
			params: { slug: actor.slug }
		}
	})

	return paths
}

async function getMovies(params: TypeParamSlug) {
	try {
		const { data: actor } = await actorService.getBySlug(
			params?.slug as string
		)

		if (!actor) return redirect('/404')

		const { data: movies } = await movieService.getByActor(actor.id)

		return { actor, movies }
	} catch (error) {
		return redirect('/404')
	}
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { actor } = await getMovies(params)

	return {
		title: actor.name,
		openGraph: {
			images: {
				url: actor.photoUrl
			}
		}
	}
}

export default async function ActorPage({ params }: IPageSlugParam) {
	const { actor, movies } = await getMovies(params)

	return (
		<div className='px-6'>
			<Catalog title={actor.name} movies={movies} />
		</div>
	)
}
