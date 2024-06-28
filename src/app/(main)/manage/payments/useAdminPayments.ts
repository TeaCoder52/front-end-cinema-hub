import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { IListItem } from '@/components/ui/admin/admin-table/admin-list/admin-list.interface'

import { paymentService } from '@/services/payment.service'

import { PaymentStatus } from '@/types/payment.types'

import { formatDate } from '@/utils/date/formatDate'
import { convertPrice } from '@/utils/string/convertPrice'

export const useAdminPayments = () => {
	const queryClient = useQueryClient()

	const { data: payments, isLoading } = useQuery({
		queryKey: ['get payments for admin dashboard'],
		queryFn: () => paymentService.getAll(),
		select: data =>
			data.map(
				(payment): IListItem => ({
					id: payment.id,
					items: [
						payment.status === PaymentStatus.PENDING
							? 'В ожидании'
							: 'Оплачен',
						formatDate(payment.createdAt),
						convertPrice(payment.amount)
					]
				})
			)
	})

	const { mutateAsync: deleteAsync } = useMutation({
		mutationKey: ['delete payment'],
		mutationFn: (paymentId: string) => paymentService.delete(paymentId),
		onSuccess() {
			toast.success('Платёж удалён')
			queryClient.invalidateQueries({
				queryKey: ['get payments for admin dashboard']
			})
		},
		onError() {
			toast.error('Ошибка при удалении')
		}
	})

	return useMemo(
		() => ({
			payments,
			isLoading,
			deleteAsync
		}),
		[payments, isLoading, deleteAsync]
	)
}
