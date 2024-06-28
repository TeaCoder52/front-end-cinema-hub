'use client'

import { FC } from 'react'

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader'
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminGenres } from './useAdminGenres'

const Genres: FC = () => {
	const {
		handleSearch,
		searchTerm,
		genres,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminGenres()

	return (
		<div className='px-6'>
			<Heading>Жанры</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={genres || []}
				headerItems={['Название', 'Ссылка']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Genres
