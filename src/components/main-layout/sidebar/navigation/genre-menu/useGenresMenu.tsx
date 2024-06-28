import { useQuery } from '@tanstack/react-query'

import { PUBLIC_URL } from '@/config/url.config'

import { genreService } from '@/services/genre.service'

import { IMenuItem } from '../menu.interface'

export const useGenresMenu = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get genres for menu'],
		queryFn: () => genreService.getAll(),
		select: data =>
			data
				.map(
					genre =>
						({
							icon: genre.icon,
							link: PUBLIC_URL.genre(genre.slug),
							value: genre.name
						}) as IMenuItem
				)
				.splice(0, 4)
	})

	return { data, isLoading }
}
