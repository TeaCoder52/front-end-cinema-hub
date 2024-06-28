import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.service'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => fileService.upload(data, folder),
		onSuccess({ data }) {
			onChange(data[0].url)
		},
		onError() {
			toast.error('Ошибка при загрузке файла')
		}
	})

	const uploadImage = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)

			const files = event.target.files

			if (files?.length) {
				const formData = new FormData()
				formData.append('image', files[0])

				await mutateAsync(formData)

				setTimeout(() => {
					setIsLoading(false)
				}, 2000)
			}
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadImage,
			isLoading
		}),
		[uploadImage, isLoading]
	)
}
