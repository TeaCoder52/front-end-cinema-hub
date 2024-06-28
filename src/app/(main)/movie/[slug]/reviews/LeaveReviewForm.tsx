import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Rating } from 'react-simple-star-rating'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/form-elements/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { TypeData, reviewService } from '@/services/review.service'

import styles from './Reviews.module.scss'

interface ILeaveReviewForm {
	movieId: string
	setModalOpen: (isOpen: boolean) => void
}

const LeaveReviewForm: FC<ILeaveReviewForm> = ({ movieId, setModalOpen }) => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		control
	} = useForm<TypeData>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['leave review'],
		mutationFn: (data: TypeData) => reviewService.leave(movieId, data),
		onSuccess() {
			toast.success('Отзыв успешно опубликован!')
			queryClient.refetchQueries({ queryKey: ['get movie', movieId] })
			setModalOpen(false)
		}
	})

	const onSubmit: SubmitHandler<TypeData> = data => {
		mutate(data)
		reset()
	}

	return (
		<div className={styles.leave_form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading className={styles.heading}>Написать отзыв</Heading>

				{isPending ? (
					<div className='flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<div>
						<Controller
							control={control}
							name='rating'
							render={({ field: { onChange, value } }) => (
								<Rating
									onClick={onChange}
									initialValue={value}
									SVGstyle={{
										display: 'inline-block'
									}}
									size={20}
									transition
								/>
							)}
							rules={{
								required: 'Рейтинг обязателен!'
							}}
						/>
						<textarea
							{...formRegister('text', {
								required: 'Текст обязателен'
							})}
							placeholder='Текст отзыва...'
							className={styles.textarea}
						/>

						{Object.entries(errors) && (
							<ul className={styles.errors}>
								{Object.entries(errors).map(([_, error]) => (
									<li>{error?.message}</li>
								))}
							</ul>
						)}

						<div className='text-right mb-2 mt-8'>
							<Button type='submit'>Добавить</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

export default LeaveReviewForm
