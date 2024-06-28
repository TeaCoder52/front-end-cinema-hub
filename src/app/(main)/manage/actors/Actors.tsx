'use client'

import { FC } from 'react'

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader'
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminActors } from './useAdminActors'

const Actors: FC = () => {
	const {
		handleSearch,
		searchTerm,
		actors,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminActors()

	return (
		<div className='px-6'>
			<Heading>Актёры</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={actors || []}
				headerItems={['Имя', 'Кол-во фильмов']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Actors
