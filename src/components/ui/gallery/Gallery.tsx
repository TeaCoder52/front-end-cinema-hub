import { FC } from 'react'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

interface IGallery {
	items: IGalleryItem[]
}

const Gallery: FC<IGallery> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map(item => (
				<GalleryItem key={item.link} item={item} variant='vertical' />
			))}
		</div>
	)
}

export default Gallery
