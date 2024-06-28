import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { ADMIN_URL, PUBLIC_URL } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { actorService } from '@/services/actor.service'

export const useAdminActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: actors, isLoading } = useQuery({
		queryKey: ['get actors for admin dashboard', debouncedSearch],
		queryFn: () => actorService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(actor): IListItem => ({
					id: actor.id,
					viewUrl: PUBLIC_URL.actor(actor.slug),
					editUrl: ADMIN_URL.actorEdit(actor.id),
					items: [actor.name, String(actor.movies.length)]
				})
			)
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation({
		mutationKey: ['create actor'],
		mutationFn: () => actorService.create(),
		onSuccess({ data: id }) {
			toast.success('Актёр создан')
			push(ADMIN_URL.actorEdit(id))
			queryClient.invalidateQueries({
				queryKey: ['get actors for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete actor'],
		mutationFn: (actorId: string) => actorService.delete(actorId),
		onSuccess() {
			toast.success('Актёр удалён')
			queryClient.invalidateQueries({
				queryKey: ['get actors for admin dashboard']
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
			actors,
			isLoading,
			createAsync,
			deleteAsync
		}),
		[handleSearch, searchTerm, actors, isLoading, createAsync, deleteAsync]
	)
}
