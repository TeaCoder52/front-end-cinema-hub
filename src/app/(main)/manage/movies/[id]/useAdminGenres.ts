import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/components/ui/form-elements/form.interface'

import { genreService } from '@/services/genre.service'

export const useAdminGenres = () => {
	const { data: genres, isLoading: isGenresLoading } = useQuery({
		queryKey: ['list of genre'],
		queryFn: () => genreService.getAll(),
		select: data =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre.id
				})
			)
	})

	return { genres, isGenresLoading }
}
