import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'

import { IMenu } from './menu.interface'

export const userMenu: IMenu = {
	title: 'Меню',
	items: [
		{
			icon: 'LuCompass',
			link: PUBLIC_URL.home(),
			value: 'Главная'
		},
		{
			icon: 'LuClapperboard',
			link: PUBLIC_URL.explorer(),
			value: 'Фильмы'
		},
		{
			icon: 'LuFlame',
			link: PUBLIC_URL.trending(),
			value: 'Популярные'
		}
	]
}

export const adminMenu: IMenu = {
	title: 'Меню',
	items: [
		{
			icon: 'LuLayoutDashboard',
			link: ADMIN_URL.root(),
			value: 'Статистика'
		},
		{
			icon: 'LuUsers',
			link: ADMIN_URL.users(),
			value: 'Пользователи'
		},
		{
			icon: 'LuTv',
			link: ADMIN_URL.movies(),
			value: 'Фильмы'
		},
		{
			icon: 'LuBook',
			link: ADMIN_URL.genres(),
			value: 'Жанры'
		},
		{
			icon: 'LuBookDown',
			link: ADMIN_URL.actors(),
			value: 'Актеры'
		},
		{
			icon: 'LuStar',
			link: ADMIN_URL.reviews(),
			value: 'Отзывы'
		},
		{
			icon: 'LuRussianRuble',
			link: ADMIN_URL.payments(),
			value: 'Платежи'
		}
	]
}
