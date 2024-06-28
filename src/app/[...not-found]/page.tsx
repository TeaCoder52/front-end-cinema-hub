import type { Metadata } from 'next'
import Link from 'next/link'

import Heading from '@/components/ui/heading/Heading'

import { PUBLIC_URL } from '@/config/url.config'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from './NotFound.module.scss'

export const metadata: Metadata = {
	title: 'Страница не существует!',
	...NO_INDEX_PAGE
}

export default function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				<Heading>404. Страница не найдена</Heading>
				<p>Хм, похоже, эта страница не существует.</p>
				<Link href={PUBLIC_URL.home()} className={styles.link}>
					Перейти на главную
				</Link>
			</div>
		</div>
	)
}
