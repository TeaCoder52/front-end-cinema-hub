import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { movieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresList'

export const useAdminMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: movies, isLoading } = useQuery({
		queryKey: ['get movies for admin dashboard', debouncedSearch],
		queryFn: () => movieService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(movie): IListItem => ({
					id: movie.id,
					viewUrl: PUBLIC_URL.movie(movie.slug),
					editUrl: ADMIN_URL.movieEdit(movie.id),
					items: [
						movie.title,
						getGenresList(movie.genres),
						String(movie.views)
					]
				})
			)
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create movie'],
		mutationFn: () => movieService.create(),
		onSuccess({ data: id }) {
			toast.success('Фильм создан')
			push(ADMIN_URL.movieEdit(id))
			queryClient.invalidateQueries({
				queryKey: ['get movies for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete movie'],
		mutationFn: (movieId: string) => movieService.delete(movieId),
		onSuccess() {
			toast.success('Фильм удалён')
			queryClient.invalidateQueries({
				queryKey: ['get movies for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			movies,
			isLoading,
			createAsync,
			deleteAsync
		}),
		[handleSearch, searchTerm, movies, isLoading, createAsync, deleteAsync]
	)
}
