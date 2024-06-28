import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import { userService } from '@/services/user.service'

import styles from './FavoriteButton.module.scss'

interface IFavoriteButton {
	movieId: string
}

const FavoriteButton: FC<IFavoriteButton> = ({ movieId }) => {
	const { user } = useProfile()

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => userService.toggleFavorite(movieId),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
		}
	})

	if (!user) return null

	const isExists = user.favorites.some(favorite => favorite.id === movieId)

	return (
		<button
			onClick={() => mutate()}
			disabled={isPending}
			className={styles.button}
		>
			{isExists ? (
				<AiFillHeart color='#f6004a' size={33} />
			) : (
				<AiFillHeart opacity={0.7} size={33} />
			)}
		</button>
	)
}

export default FavoriteButton
