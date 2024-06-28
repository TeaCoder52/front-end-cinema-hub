import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import styles from './MainStatistics.module.scss'

const StatisticItemLoading: FC = () => {
	return (
		<div className={styles.item}>
			<div className={styles.header}>
				<SkeletonLoader className='h-5 w-24' />
				<SkeletonLoader className='size-[22px]' />
			</div>
			<SkeletonLoader className='h-7 w-16 mt-2' />
		</div>
	)
}

export default StatisticItemLoading
