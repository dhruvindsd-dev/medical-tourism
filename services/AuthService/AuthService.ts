import { AXIOS_INSTANCE } from "../../config/config"
import { AUTH_URL } from "../../config/endpoints"
import { AuthInterface } from "./AuthInterface"

export const getNewAccessTokenFromRefreshToken = async (refresh: string) => AXIOS_INSTANCE.post<{ access: string }>(AUTH_URL.refreshToken, { refresh }).then(({ data }) => data)

export const getToken = async (obj: { email: string; password: string }) =>
	AXIOS_INSTANCE.post<AuthInterface>(AUTH_URL.login, {
		password: obj.password,
		email: obj.email,
	}).then(({ data }) => data)

export const sendActivationMail = async (obj: { name: string; email: string; password: string }) => AXIOS_INSTANCE.post<{ message: string }>(AUTH_URL.sendActivationEmail, obj).then(({ data }) => data)

export const registerUser = async (obj: { name: string; email: string; password: string }) => AXIOS_INSTANCE.post<AuthInterface>(AUTH_URL.register, obj).then(({ data }) => data)

export const activateUser = async (token: string) => AXIOS_INSTANCE.post<AuthInterface>(AUTH_URL.activate, { token }).then(({ data }) => data)
