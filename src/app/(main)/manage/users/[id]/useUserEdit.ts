import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { userService } from '@/services/user.service'

import { IUserEditInput } from '@/types/user.types'

export const useUserEdit = (userId: string) => {
	const { data: user, isLoading } = useQuery({
		queryKey: ['user', userId],
		queryFn: () => userService.getById(userId),
		select: ({ data }) => data,
		enabled: !!userId
	})

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update user'],
		mutationFn: (data: IUserEditInput) => userService.update(userId, data),
		onSuccess() {
			toast.success('Пользователь обновлён')
			queryClient.invalidateQueries({
				queryKey: ['get users for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	const onSubmit: SubmitHandler<IUserEditInput> = async data => {
		await mutateAsync(data)
	}

	return { user, onSubmit, isLoading }
}
