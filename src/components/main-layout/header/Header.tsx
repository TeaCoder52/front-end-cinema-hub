import { FC } from 'react'

import styles from './Header.module.scss'
import Search from './search/Search'
import UserMenu from './user-menu/UserMenu'

const Header: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Search />
				<UserMenu />
			</div>
		</div>
	)
}

export default Header
