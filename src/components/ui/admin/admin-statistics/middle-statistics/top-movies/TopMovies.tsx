import { FC } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'

import { ITopMovie } from '@/types/statistics.types'

import styles from './TopMovies.module.scss'
import TopMoviesTooltip from './TopMoviesTooltip'

const COLORS = ['#B61C1C', '#822A2A', '#790A0A', '#5D0B0B']

interface ITopMovies {
	data: ITopMovie[]
}

const TopMovies: FC<ITopMovies> = ({ data }) => {
	return (
		<div className={styles.top_movies}>
			<ResponsiveContainer width='100%' height={390}>
				<PieChart>
					<Legend
						layout='horizontal'
						verticalAlign='bottom'
						align='right'
						iconType='circle'
						content={({ payload }: any) => {
							return (
								<ul>
									{payload.map((entry: any, index: number) => (
										<li key={index}>{entry.payload.title}</li>
									))}
								</ul>
							)
						}}
					/>
					<Tooltip content={<TopMoviesTooltip />} />
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						outerRadius={90}
						innerRadius={60}
						paddingAngle={4}
						stroke='none'
						dataKey='views'
						labelLine={false}
					>
						{data.map((_entry, index) => (
							<Cell
								key={index}
								fill={COLORS[index % COLORS.length]}
								style={{ outline: 'none' }}
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default TopMovies
