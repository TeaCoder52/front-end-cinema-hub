import Cookies from 'js-cookie'

import { axiosClassic } from '@/api/interceptors'

import { API_URL } from '@/config/api.config'

import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { EnumTokens, saveToStorage } from './auth-token.service'

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			API_URL.auth(`/${type}`),
			data
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}

	async getNewTokens() {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			API_URL.auth(`/login/access-token`),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}

export const authService = new AuthService()
