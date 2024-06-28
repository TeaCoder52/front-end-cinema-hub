import cn from 'clsx'
import { FC } from 'react'

interface ISkeletonLoader {
	className?: string
}

const SkeletonLoader: FC<ISkeletonLoader> = ({ className }) => {
	return (
		<div className={cn('animate-pulse rounded-lg bg-[#292A2E]', className)} />
	)
}

export default SkeletonLoader
