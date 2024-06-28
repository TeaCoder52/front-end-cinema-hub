import Image from 'next/image'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IReview } from '@/types/review.types'

import styles from './Reviews.module.scss'

const ReviewItem: FC<{ review: IReview }> = ({ review }) => {
	return (
		<div className={styles.review}>
			<div className={styles.user}>
				<Image
					alt={review.user.name}
					src={review.user.avatarPath}
					width={40}
					height={40}
					className={styles.avatar}
				/>
				<span>{review.user.name}</span>
			</div>
			<Rating
				readonly
				initialValue={review.rating}
				SVGstyle={{
					display: 'inline-block'
				}}
				size={18}
				allowFraction
				transition
			/>
			<div className={styles.text}>{review.text}</div>
		</div>
	)
}

export default ReviewItem
