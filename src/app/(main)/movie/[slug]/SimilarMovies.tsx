import { FC } from 'react'

import Gallery from '@/components/ui/gallery/Gallery'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import Heading from '@/components/ui/heading/Heading'

interface ISimilarMovies {
	similarMovies: IGalleryItem[]
}

const SimilarMovies: FC<ISimilarMovies> = ({ similarMovies }) => {
	return similarMovies.length ? (
		<div className='mt-8'>
			<Heading className='mb-3'>Похожие фильмы</Heading>
			<Gallery items={similarMovies} />
		</div>
	) : null
}

export default SimilarMovies
