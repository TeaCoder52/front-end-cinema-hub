import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import Menu from '../Menu'

import { useGenresMenu } from './useGenresMenu'

const GenreMenu: FC = () => {
	const { data, isLoading } = useGenresMenu()

	return isLoading ? (
		<div className='space-y-3'>
			{Array.from({ length: 4 }).map((_, index) => (
				<SkeletonLoader className='h-10 mx-4 mt-2' key={index} />
			))}
		</div>
	) : (
		<Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
	)
}

export default GenreMenu
