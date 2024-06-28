import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Movies from './Movies'

export const metadata: Metadata = {
	title: 'Фильмы',
	...NO_INDEX_PAGE
}

export default function MoviesPage() {
	return <Movies />
}
