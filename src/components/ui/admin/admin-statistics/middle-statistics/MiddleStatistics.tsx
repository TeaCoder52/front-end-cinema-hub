'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { statisticsService } from '@/services/statistics.service'

import styles from './MiddleStatistics.module.scss'
import SalesChart from './sales-chart/SalesChart'
import SalesChartLoading from './sales-chart/SalesChartLoading'
import TopMovies from './top-movies/TopMovies'
import TopMoviesLoading from './top-movies/TopMoviesLoading'

const MiddleStatistics: FC = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get middle statistics'],
		queryFn: () => statisticsService.getMiddle()
	})

	if (isLoading)
		return (
			<div className={styles.wrapper}>
				<div className={styles.top_movies}>
					<TopMoviesLoading />
				</div>
				<div className={styles.sales_chart}>
					<SalesChartLoading />
				</div>
			</div>
		)

	return (
		<div className={styles.wrapper}>
			{data ? (
				<>
					<div className={styles.top_movies}>
						<TopMovies data={data.topMovies} />
					</div>
					<div className={styles.sales_chart}>
						<SalesChart data={data.salesByWeek} />
					</div>
				</>
			) : (
				<div>Нету данных для статистики</div>
			)}
		</div>
	)
}

export default MiddleStatistics
