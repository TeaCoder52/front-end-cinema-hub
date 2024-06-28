import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { IPageIdParam } from '@/types/page-params.types'

import GenreEdit from './GenreEdit'

export const metadata: Metadata = {
	title: 'Настройка жанра',
	...NO_INDEX_PAGE
}

export default function GenreEditPage({ params }: IPageIdParam) {
	return <GenreEdit genreId={params.id} />
}
