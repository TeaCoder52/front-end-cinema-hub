import { FC } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import SkeletonLoader from '../SkeletonLoader'
import GalleryItem from '../gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<ICatalog> = ({
	title,
	description,
	movies,
	isLoading = false
}) => {
	return (
		<div>
			<Heading className={styles.heading}>{title}</Heading>

			{description && <Description text={description} />}

			<section className={styles.movies}>
				{isLoading ? (
					Array.from({ length: 8 }).map((_, index) => (
						<SkeletonLoader key={index} className={styles.loading} />
					))
				) : movies.length ? (
					movies.map(movie => (
						<GalleryItem
							key={movie.id}
							item={{
								name: movie.title,
								link: PUBLIC_URL.movie(movie.slug),
								poster: movie.bigPoster,
								content: { title: movie.title }
							}}
							variant='horizontal'
						/>
					))
				) : (
					<div className={styles.not_found}>Фильмы не найдены</div>
				)}
			</section>
		</div>
	)
}

export default Catalog
