export interface IListItem {
	id: string
	editUrl?: string
	viewUrl?: string
	items: string[]
}

export interface IAdminListItem {
	listItem: IListItem
	removeHandler?: () => void
}
