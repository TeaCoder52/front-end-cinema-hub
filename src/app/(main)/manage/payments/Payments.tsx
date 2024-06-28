'use client'

import { FC } from 'react'

import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminPayments } from './useAdminPayments'

const Payments: FC = () => {
	const { payments, isLoading, deleteAsync } = useAdminPayments()

	return (
		<div className='px-6'>
			<Heading>Платежи</Heading>

			<AdminList
				listItems={payments || []}
				headerItems={['Статус', 'Дата создания', 'Сумма']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Payments
