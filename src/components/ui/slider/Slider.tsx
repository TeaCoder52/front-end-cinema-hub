import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import SlideItem from './SlideItem'
import styles from './Slider.module.scss'
import SlideArrow from './slide-arrow/SlideArrow'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
}

const Slider: FC<ISlider> = ({ slides }) => {
	const { handleClick, index, isNext, isPrev, slideIn } = useSlider(
		slides.length
	)

	return (
		<div className={styles.slider}>
			{isPrev && (
				<SlideArrow
					variant='left'
					clickHandler={() => handleClick('prev')}
				/>
			)}

			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames='slide-animation'
				unmountOnExit
			>
				<SlideItem slide={slides[index]} />
			</CSSTransition>

			{isNext && (
				<SlideArrow
					variant='right'
					clickHandler={() => handleClick('next')}
				/>
			)}
		</div>
	)
}

export default Slider
