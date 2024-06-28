import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.scss'

interface IBanner {
	image: string
	Detail?: FC | null
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				src={image}
				alt=''
				className={styles.image}
				unoptimized
				draggable={false}
				priority
				fill
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
