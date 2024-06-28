import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ children, className }) => {
	return (
		<h1 className={cn('text-2xl font-semibold', className)}>{children}</h1>
	)
}

export default Heading
