import { TypeIconName } from '@/components/ui/Icon'

export interface IMenuItem {
	icon: TypeIconName
	value: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}
