import { ChangeEvent, FC } from 'react'

import { Icon } from '../Icon'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<label className={styles.search}>
			<Icon name='LuSearch' className={styles.icon} />
			<input
				type='text'
				placeholder='Поиск...'
				value={searchTerm}
				onChange={handleSearch}
			/>
		</label>
	)
}

export default SearchField
