import type { Metadata } from 'next'

import Premium from './Premium'

export const metadata: Metadata = {
	title: 'Премиум подписка'
}

export default function PremiumPage() {
	return <Premium />
}
