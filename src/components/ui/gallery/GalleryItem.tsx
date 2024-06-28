import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import Heading from '../heading/Heading'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			href={item.link}
			className={cn(styles.item, {
				[styles.with_text]: item.content,
				[styles.horizontal]: variant === 'horizontal',
				[styles.vertical]: variant === 'vertical'
			})}
		>
			<Image
				src={item.poster}
				alt={item.name}
				draggable={false}
				fill
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<Heading className={styles.title}>{item.content.title}</Heading>
					{item.content.subTitle && (
						<div className={styles.sub_title}>
							{item.content.subTitle}
						</div>
					)}
				</div>
			)}
		</Link>
	)
}

export default GalleryItem
