import { FC } from 'react'

import Loader from '@/components/ui/Loader'

import styles from './SalesChart.module.scss'

const SalesChartLoading: FC = () => {
	return (
		<div className={styles.sales_chart}>
			<div className='h-[390px] w-full flex items-center justify-center'>
				<Loader />
			</div>
		</div>
	)
}

export default SalesChartLoading
