import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Actors from './Actors'

export const metadata: Metadata = {
	title: 'Актёры',
	...NO_INDEX_PAGE
}

export default function ActorsPage() {
	return <Actors />
}
