import { axiosWithAuth } from '@/api/interceptors'

import { IStatisticItem } from '@/components/ui/admin/admin-statistics/main-statistics/statistic-item.interface'

import { API_URL } from '@/config/api.config'

import { IMiddleStatisticsResponse } from '@/types/statistics.types'

class StatisticsService {
	async getMain() {
		const { data } = await axiosWithAuth.get<IStatisticItem[]>(
			API_URL.statistics('/main')
		)

		return data
	}

	async getMiddle() {
		const { data } = await axiosWithAuth.get<IMiddleStatisticsResponse>(
			API_URL.statistics('/middle')
		)

		return data
	}
}

export const statisticsService = new StatisticsService()
