import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { ADMIN_URL } from '@/config/url.config'

import { useDebounce } from '@/hooks/useDebounce'

import { userService } from '@/services/user.service'

import { UserRole } from '@/types/user.types'

export const useAdminUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryClient = useQueryClient()

	const { data: users, isLoading } = useQuery({
		queryKey: ['get users for admin dashboard', debouncedSearch],
		queryFn: () => userService.getAll(debouncedSearch),
		select: data =>
			data.map(
				(user): IListItem => ({
					id: user.id,
					editUrl: ADMIN_URL.userEdit(user.id),
					items: [
						user.name,
						user.email,
						user.role === UserRole.USER ? 'Пользователь' : 'Админ'
					]
				})
			)
	})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (userId: string) => userService.delete(userId),
		onSuccess() {
			toast.success('Пользователь удалён')
			queryClient.invalidateQueries({
				queryKey: ['get users for admin dashboard']
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
			users,
			isLoading,
			deleteAsync
		}),
		[handleSearch, searchTerm, users, isLoading, deleteAsync]
	)
}
