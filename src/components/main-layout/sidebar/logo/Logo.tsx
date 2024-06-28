import cn from 'clsx'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './Logo.module.scss'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
})

const Logo: FC = () => {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image src='/images/logo.svg' alt='CinemaHub' width={50} height={50} />
			<div
				className={cn('font-semibold text-2xl text-white', font.className)}
			>
				Cinema<span className='text-primary'>Hub</span>
			</div>
		</Link>
	)
}

export default Logo
