import Link from 'next/link'
import { FC, Fragment } from 'react'

import { IContentList } from '../content.interface'

import styles from './ContentList.module.scss'

const ContentList: FC<IContentList> = ({ links, name }) => {
	return (
		<div className={styles.list}>
			<div className={styles.name}>{name}</div>
			<div className={styles.links}>
				{links.slice(0, 3).map((link, idx) => (
					<Fragment key={idx}>
						<Link href={link.link} className={styles.link}>
							{link.title}
						</Link>
						{idx + 1 !== links.length ? ', ' : ''}
					</Fragment>
				))}
			</div>
		</div>
	)
}

export default ContentList
