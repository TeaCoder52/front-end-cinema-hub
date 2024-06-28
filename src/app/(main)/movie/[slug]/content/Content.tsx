import { FC, useState } from 'react'
import { MdStarRate } from 'react-icons/md'

import Heading from '@/components/ui/heading/Heading'

import { PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { IMovie } from '@/types/movie.types'

import styles from './Content.module.scss'
import ContentList from './content-list/ContentList'
import FavoriteButton from './favorite-button/FavoriteButton'

interface IContent {
	movie: IMovie
}

const Content: FC<IContent> = ({ movie }) => {
	const { user } = useProfile()

	const [rating, setRating] = useState<number>(
		Math.round(
			movie.reviews.reduce((acc, review) => acc + review.rating, 0) /
				movie.reviews.length
		) || 0
	)

	return (
		<div className={styles.content}>
			<Heading>{movie.title}</Heading>
			<div className={styles.details}>
				<span>{movie.year} • </span>
				<span>{movie.country} • </span>
				<span>{movie.duration} мин. </span>
			</div>

			<ContentList
				name='Жанры: '
				links={movie.genres.slice(0, 3).map(genre => ({
					id: genre.id,
					link: PUBLIC_URL.genre(genre.slug),
					title: genre.name
				}))}
			/>

			<ContentList
				name='Актёры: '
				links={movie.actors.slice(0, 3).map(actor => ({
					id: actor.id,
					link: PUBLIC_URL.actor(actor.slug),
					title: actor.name
				}))}
			/>

			<div className={styles.rating}>
				<MdStarRate />
				<span>{rating.toFixed(1)}</span>
			</div>

			{user && <FavoriteButton movieId={movie.id} />}
		</div>
	)
}

export default Content
