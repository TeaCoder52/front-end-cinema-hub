import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { reviewService } from '@/services/review.service'

export const useAdminReviews = () => {
	const queryClient = useQueryClient()

	const { data: reviews, isLoading } = useQuery({
		queryKey: ['get reviews for admin dashboard'],
		queryFn: () => reviewService.getAll(),
		select: data =>
			data.map(
				(review): IListItem => ({
					id: review.id,
					items: [
						Array.from({ length: review.rating })
							.map(() => '⭐️')
							.join(' '),
						review.user.name
					]
				})
			)
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete review'],
		mutationFn: (reviewId: string) => reviewService.delete(reviewId),
		onSuccess() {
			toast.success('Отзыв удалён')
			queryClient.invalidateQueries({
				queryKey: ['get reviews for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	return useMemo(
		() => ({
			reviews,
			isLoading,
			deleteAsync
		}),
		[reviews, isLoading, deleteAsync]
	)
}
