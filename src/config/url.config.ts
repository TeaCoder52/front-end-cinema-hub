export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	explorer: () => PUBLIC_URL.root('/explorer'),
	trending: () => PUBLIC_URL.root('/trending'),

	actor: (slug = '') => PUBLIC_URL.root(`/actor/${slug}`),
	genre: (slug = '') => PUBLIC_URL.root(`/genre/${slug}`),
	movie: (slug = '') => PUBLIC_URL.root(`/movie/${slug}`),

	premium: () => PUBLIC_URL.root('/premium')
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? '/' + url : ''}`,

	home: () => DASHBOARD_URL.root(),
	favorites: () => DASHBOARD_URL.root('/favorites')
}

export const ADMIN_URL = {
	root: (url = '') => `/manage${url ? '/' + url : ''}`,

	home: () => ADMIN_URL.root(),

	users: () => ADMIN_URL.root('users'),
	userEdit: (id = '') => ADMIN_URL.root(`users/${id}`),

	movies: () => ADMIN_URL.root('movies'),
	movieEdit: (id = '') => ADMIN_URL.root(`movies/${id}`),

	genres: () => ADMIN_URL.root('genres'),
	genreEdit: (id = '') => ADMIN_URL.root(`genres/${id}`),

	actors: () => ADMIN_URL.root('actors'),
	actorEdit: (id = '') => ADMIN_URL.root(`actors/${id}`),

	reviews: () => ADMIN_URL.root('reviews'),

	payments: () => ADMIN_URL.root('payments')
}
