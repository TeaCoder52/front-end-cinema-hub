'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import Button from '@/components/ui/form-elements/button/Button'

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Subscribe.module.scss'

const Subscribe: FC = () => {
	const { user } = useProfile()
	const pathname = usePathname()

	const isAdminPage = pathname?.includes(ADMIN_URL.root())

	return (
		!isAdminPage && (
			<div className={styles.subscribe}>
				<h2>
					{user?.isHasPremium
						? 'У вас уже есть премиум'
						: 'Премиум подписка'}
				</h2>
				<p>
					{user?.isHasPremium
						? 'Вы уже имеете неограниченный доступ ко всем фильмам.'
						: 'С премиум-подпиской у вас неограниченный доступ ко всем фильмам.'}
				</p>
				<Link
					href={
						user?.isHasPremium
							? PUBLIC_URL.explorer()
							: PUBLIC_URL.premium()
					}
				>
					<Button size='sm' className={styles.button}>
						{user?.isHasPremium ? 'Смотреть фильмы' : 'Оформить подписку'}
					</Button>
				</Link>
			</div>
		)
	)
}

export default Subscribe
