import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Genres from './Genres'

export const metadata: Metadata = {
	title: 'Жанры',
	...NO_INDEX_PAGE
}

export default function GenresPage() {
	return <Genres />
}
