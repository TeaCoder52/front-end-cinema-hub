export interface ILink {
	id: string
	link: string
	title: string
}

export interface IContentList {
	name: string
	links: ILink[]
}
