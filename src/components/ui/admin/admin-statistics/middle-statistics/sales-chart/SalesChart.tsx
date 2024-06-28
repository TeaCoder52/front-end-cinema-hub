import { FC } from 'react'
import {
	Bar,
	BarChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis
} from 'recharts'

import { ISalesByWeek } from '@/types/statistics.types'

import styles from './SalesChart.module.scss'
import SalesTooltip from './SalesChartTooltip'

interface ISalesChart {
	data: ISalesByWeek[]
}

const SalesChart: FC<ISalesChart> = ({ data }) => {
	return (
		<div className={styles.sales_chart}>
			<ResponsiveContainer width='100%' height={390}>
				<BarChart data={data} width={500} height={300}>
					<XAxis
						tickLine={false}
						axisLine={false}
						dataKey='date'
						style={{ fontSize: '12px' }}
						tickMargin={12}
					/>
					<Tooltip
						cursor={{ fill: 'transparent' }}
						content={<SalesTooltip />}
					/>
					<Bar
						dataKey='total'
						fill='#B61C1C'
						activeBar={<Rectangle fill='#9D1C1C' />}
						radius={[7, 7, 7, 7]}
						barSize={36}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default SalesChart
