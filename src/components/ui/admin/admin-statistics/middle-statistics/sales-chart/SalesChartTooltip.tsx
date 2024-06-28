import { FC } from 'react'

import { convertPrice } from '@/utils/string/convertPrice'

import styles from '../MiddleStatistics.module.scss'

interface ISalesTooltip {
	active?: boolean
	payload?: any[]
	label?: string
}

const SalesTooltip: FC<ISalesTooltip> = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className={styles.tooltip}>
				<p className={styles.title}>{label}</p>
				<p className={styles.value}>
					Прибыль:
					<span className='ml-2'>{convertPrice(payload[0].value)}</span>
				</p>
			</div>
		)
	}

	return null
}

export default SalesTooltip
