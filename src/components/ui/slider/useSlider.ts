import { useState } from 'react'

export const useSlider = (length: number) => {
	const [currentIdx, setCurrentIdx] = useState(0)
	const [slideIn, setSlideIn] = useState(true)

	const isExistsNext = currentIdx + 1 < length
	const isExistsPrev = currentIdx ? currentIdx - 1 < length : false

	const handleArrowClick = (direction: 'next' | 'prev') => {
		const newIndex = direction === 'next' ? currentIdx + 1 : currentIdx - 1
		setSlideIn(false)

		setTimeout(() => {
			setCurrentIdx(newIndex)
			setSlideIn(true)
		}, 300)
	}

	return {
		slideIn,
		index: currentIdx,
		isNext: isExistsNext,
		isPrev: isExistsPrev,
		handleClick: handleArrowClick
	}
}
