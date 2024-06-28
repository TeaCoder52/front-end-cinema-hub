import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { genreService } from '@/services/genre.service'

export const useAdminGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: genres, isLoading } = useQuery({
		queryKey: ['get genres for admin dashboard', debouncedSearch],
		queryFn: () => genreService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(genre): IListItem => ({
					id: genre.id,
					viewUrl: PUBLIC_URL.genre(genre.slug),
					editUrl: ADMIN_URL.genreEdit(genre.id),
					items: [genre.name, genre.slug]
				})
			)
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create genre'],
		mutationFn: () => genreService.create(),
		onSuccess({ data: id }) {
			toast.success('Жанр создан')
			push(ADMIN_URL.genreEdit(id))
			queryClient.invalidateQueries({
				queryKey: ['get genres for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete genre'],
		mutationFn: (genreId: string) => genreService.delete(genreId),
		onSuccess() {
			toast.success('Жанр удалён')
			queryClient.invalidateQueries({
				queryKey: ['get genres for admin dashboard']
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
			genres,
			isLoading,
			createAsync,
			deleteAsync
		}),
		[handleSearch, searchTerm, genres, isLoading, createAsync, deleteAsync]
	)
}
