'use client'

import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { ADMIN_URL } from '@/config/url.config'

import Menu from './Menu'
import GenreMenu from './genre-menu/GenreMenu'
import { adminMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
	const pathname = usePathname()

	const isAdminPage = pathname?.includes(ADMIN_URL.root())

	return (
		<div className='flex flex-col w-full flex-1'>
			<Menu menu={isAdminPage ? adminMenu : userMenu} />
			{!isAdminPage && <GenreMenu />}
		</div>
	)
}

export default MenuContainer
