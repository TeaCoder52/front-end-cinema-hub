import Image from 'next/image'
import { FC } from 'react'

import SkeletonLoader from '../../SkeletonLoader'
import { IUploadField } from '../form.interface'

import styles from './UploadField.module.scss'
import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
	placeholder,
	error,
	style,
	folder,
	onChange,
	isNoImage = false,
	value
}) => {
	const { uploadImage, isLoading } = useUpload(onChange, folder)

	return (
		<div className={styles.upload_field} style={style}>
			<div className={styles.upload_flex}>
				<label>
					<span>{placeholder}</span>
					<input type='file' onChange={uploadImage} />
					{error && <div className={styles.error}>{error.message}</div>}
				</label>

				{!isNoImage && (
					<div className={styles.upload_image_container}>
						{isLoading ? (
							<SkeletonLoader className='w-full h-full' />
						) : (
							value && <Image src={value} alt='' fill unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
