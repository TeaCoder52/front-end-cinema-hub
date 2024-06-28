import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '../../types/auth.types'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export enum EnumStorage {
	'USER' = 'user'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken)
	Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
