export interface ITopMovie {
	title: string
	views: number
}

export interface ISalesByWeek {
	date: string
	total: number
}

export interface IMiddleStatisticsResponse {
	topMovies: ITopMovie[]
	salesByWeek: ISalesByWeek[]
}
