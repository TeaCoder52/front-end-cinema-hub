export interface IGalleryItem {
	poster: string
	name: string
	link: string
	content?: {
		title: string
		subTitle?: string
	}
}

export interface IGalleryItemProps {
	item: IGalleryItem
	variant: 'vertical' | 'horizontal'
}
