'use client'

import { FC } from 'react'

import AdminHeader from '@/components/ui/admin/admin-table/admin-header/AdminHeader'
import AdminList from '@/components/ui/admin/admin-table/admin-list/AdminList'
import Heading from '@/components/ui/heading/Heading'

import { useAdminMovies } from './useAdminMovies'

const Movies: FC = () => {
	const {
		handleSearch,
		searchTerm,
		movies,
		isLoading,
		createAsync,
		deleteAsync
	} = useAdminMovies()

	return (
		<div className='px-6'>
			<Heading>Фильмы</Heading>

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminList
				listItems={movies || []}
				headerItems={['Название', 'Жанры', 'Просмотры']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</div>
	)
}

export default Movies
