import { FC } from 'react'
import CountUp from 'react-countup'

import Heading from '@/components/ui/heading/Heading'

import styles from './MainStatistics.module.scss'
import { getIcon } from './statisctics.util'
import { IStatisticItem } from './statistic-item.interface'

const StatisticItem: FC<{ item: IStatisticItem }> = ({ item }) => {
	const Icon = getIcon(item.id)

	return (
		<div className={styles.item}>
			<div className={styles.header}>
				<p className={styles.name}>{item.name}</p>
				<Icon className={styles.icon} />
			</div>
			<Heading>
				<CountUp end={item.value} />
			</Heading>
		</div>
	)
}

export default StatisticItem
