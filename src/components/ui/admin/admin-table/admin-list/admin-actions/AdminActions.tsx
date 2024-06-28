'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { Icon } from '@/components/ui/Icon'

import { IListItem } from '../admin-list.interface'

import styles from './AdminActions.module.scss'

interface IAdminActions extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
	removeHandler?: () => void
}

const AdminActions: FC<IAdminActions> = ({
	editUrl,
	viewUrl,
	removeHandler
}) => {
	const { push } = useRouter()

	return (
		<div className={styles.actions}>
			{viewUrl && (
				<button onClick={() => push(viewUrl)}>
					<Icon name='LuExternalLink' />
				</button>
			)}
			{editUrl && (
				<button onClick={() => push(editUrl)}>
					<Icon name='LuPencil' />
				</button>
			)}
			{removeHandler && (
				<button onClick={removeHandler}>
					<Icon name='LuTrash' />
				</button>
			)}
		</div>
	)
}

export default AdminActions
