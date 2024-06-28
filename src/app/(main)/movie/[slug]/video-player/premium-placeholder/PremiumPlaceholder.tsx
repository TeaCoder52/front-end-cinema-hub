import Link from 'next/link'
import { FC } from 'react'

import Button from '@/components/ui/form-elements/button/Button'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './PremiumPlaceholder.module.scss'

const PremiumPlaceHolder: FC = () => {
	return (
		<div className={styles.placeholder}>
			<div>
				<div>
					Для просмотра фильмов необходимо оформить премиум-подписку.
				</div>
				<Link href={PUBLIC_URL.premium()}>
					<Button className={styles.btn} size='sm'>
						Купить премиум
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default PremiumPlaceHolder
