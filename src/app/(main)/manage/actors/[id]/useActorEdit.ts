import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { actorService } from '@/services/actor.service'

import { IActorEditInput } from '@/types/actor.types'

export const useActorEdit = (actorId: string) => {
	const { data: actor, isLoading } = useQuery({
		queryKey: ['actor', actorId],
		queryFn: () => actorService.getById(actorId),
		select: ({ data }) => data,
		enabled: !!actorId
	})

	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationKey: ['update actor'],
		mutationFn: (data: IActorEditInput) => actorService.update(actorId, data),
		onSuccess() {
			toast.success('Актёр обновлён')
			queryClient.invalidateQueries({
				queryKey: ['get actors for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при обновлении')
		}
	})

	const onSubmit: SubmitHandler<IActorEditInput> = async data => {
		await mutateAsync(data)
	}

	return { actor, onSubmit, isLoading }
}
