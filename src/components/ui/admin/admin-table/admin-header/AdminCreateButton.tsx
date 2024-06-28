import { FC } from 'react'

import { Icon } from '@/components/ui/Icon'
import Button from '@/components/ui/form-elements/button/Button'

interface IAdminCreateButton {
	onClick: () => void
}

const AdminCreateButton: FC<IAdminCreateButton> = ({ onClick }) => {
	return (
		<Button onClick={onClick}>
			<Icon name='LuPlus' className='size-4 mr-2' />
			Создать
		</Button>
	)
}

export default AdminCreateButton
