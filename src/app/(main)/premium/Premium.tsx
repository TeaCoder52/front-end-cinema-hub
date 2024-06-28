'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { BsCheckCircle } from 'react-icons/bs'
import { LuLoader } from 'react-icons/lu'

import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import { paymentService } from '@/services/payment.service'

import { convertPrice } from '@/utils/string/convertPrice'

import styles from './Premium.module.scss'

const Premium: FC = () => {
	const { push } = useRouter()

	const { user, isLoading } = useProfile()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create payment'],
		mutationFn: (amount: number) => paymentService.checkout(amount),
		onSuccess({ data }) {
			push(data.confirmation.confirmation_url)
		},
		onError() {
			toast.error('Ошибка при создании платежа')
		}
	})

	const handleClick = (amount: number) => {
		user?.isHasPremium
			? push(DASHBOARD_URL.root())
			: user
				? mutate(amount)
				: push(PUBLIC_URL.auth())
	}

	return (
		<div className={styles.wrapper}>
			<Heading className={styles.heading}>Оформить подписку</Heading>
			<div className={styles.description}>
				Приобретая премиум-подписку, вы получаете доступ к тысячам часов
				киноконтента в высоком качестве.
			</div>

			<div className={styles.card_wrapper}>
				<div className={styles.plan}>
					<h1 className={styles.heading}>{convertPrice(5000)}</h1>

					<ul className={styles.features}>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							Скачивание фильмов
						</li>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							Отсутствие рекламы
						</li>
						<li className={styles.feature}>
							<BsCheckCircle className={styles.icon} />
							Высокое качество потока
						</li>
					</ul>

					<Button
						onClick={() => handleClick(5000)}
						className={styles.button}
					>
						{isLoading || isPending ? (
							<LuLoader className={styles.loader} />
						) : user?.isHasPremium ? (
							'Перейти в кабинет'
						) : (
							`Оплатить ${convertPrice(5000)}`
						)}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Premium
