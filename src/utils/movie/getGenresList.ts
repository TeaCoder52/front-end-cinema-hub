interface IArrayItem {
	name: string
}

export const getGenresList = (array: IArrayItem[]) =>
	array.map(i => i.name).join(', ')
