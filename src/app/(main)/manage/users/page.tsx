import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Users from './Users'

export const metadata: Metadata = {
	title: 'Пользователи',
	...NO_INDEX_PAGE
}

export default function UsersPage() {
	return <Users />
}
