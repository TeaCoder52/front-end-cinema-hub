import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import styles from './AdminList.module.scss'
import AdminListHeader from './AdminListHeader'
import AdminListItem from './AdminListItem'
import { IListItem } from './admin-list.interface'

interface IAdminList {
	listItems: IListItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler?: (id: string) => void
}

const AdminList: FC<IAdminList> = ({
	listItems,
	headerItems,
	isLoading,
	removeHandler
}) => {
	return (
		<div className='mb-12'>
			<AdminListHeader headerItems={headerItems} />

			{isLoading ? (
				<div className={styles.loading}>
					{Array.from({ length: 5 }).map((_, index) => (
						<SkeletonLoader className='h-11' />
					))}
				</div>
			) : listItems.length ? (
				listItems.map(listItem => (
					<AdminListItem
						key={listItem.id}
						listItem={listItem}
						removeHandler={
							removeHandler
								? () => removeHandler(listItem.id)
								: undefined
						}
					/>
				))
			) : (
				<div className={styles.not_found}>Элементы не найдены</div>
			)}
		</div>
	)
}

export default AdminList
