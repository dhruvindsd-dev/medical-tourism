import axios from "axios"
import { useRouter } from "next/router"
import { createContext, useEffect, useMemo, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { AXIOS_INSTANCE } from "../config/config"
import { IS_CLIENT } from "../config/constants"
import { D_ROUTES } from "../config/routes"
import { AuthInterface } from "../services/AuthService/AuthInterface"
import { getNewAccessTokenFromRefreshToken } from "../services/AuthService/AuthService"

interface authContextInterface {
	login: (obj: AuthInterface) => void
	isLoggedIn: boolean
	logout: () => void
}

let initialState = {}
if (IS_CLIENT && localStorage.getItem("userInfo")) initialState = JSON.parse(localStorage.getItem("userInfo")!)

export const authContext = createContext<Partial<authContextInterface & AuthInterface>>(initialState)

export const AuthProvider = ({ children }: any) => {
	const router = useRouter()
	const [state, setState] = useState<Partial<AuthInterface>>(initialState)
	const [isLoggedIn, setIsLoggedIn] = useState(false) // using state instead of directly checking state.tokens?.access because, it might cause hydration issues with SSR. Check nextjs hydration issue for more info

	useEffect(() => {
		return () => {
			AXIOS_INSTANCE.interceptors.response.eject(axiosResIns)
		}
	}, [state.tokens?.access, state.tokens?.refresh])

	useEffect(() => {
		return () => {
			AXIOS_INSTANCE.interceptors.request.eject(axiosReqIns)
		}
	}, [state.tokens?.access])

	useDeepCompareEffect(() => {
		if (Object.keys(state).length) localStorage.setItem("userInfo", JSON.stringify(state))
		if (state.tokens?.access) setIsLoggedIn(true)
		else setIsLoggedIn(false)
	}, [state])

	const refreshToken = async () => {
		try {
			const token = (await getNewAccessTokenFromRefreshToken(state.tokens?.refresh!)).access
			setState({
				...state,
				tokens: {
					...state.tokens!,
					access: token,
				},
			})
			return token
		} catch (err) {
			throw err
		}
	}

	const axiosResIns = useMemo(
		() =>
			AXIOS_INSTANCE.interceptors.response.use(
				(config) => config,
				async (error) => {
					const ogRequest = error.config
					if (ogRequest.headers.Authorization && error?.response?.status === 401 && !ogRequest._retry) {
						ogRequest._retry = true
						const token = await refreshToken()
						ogRequest.headers.Authorization = `Bearer ${token}`
						return axios(ogRequest)
					} else if (error?.response?.status === 401) {
						router.replace(D_ROUTES.LOGIN)
					}
					return Promise.reject(error)
				}
			),
		[state.tokens?.refresh, state.tokens?.access]
	)

	const axiosReqIns = useMemo(() => {
		return AXIOS_INSTANCE.interceptors.request.use((config) => {
			const token = state.tokens?.access
			if (token) config.headers.Authorization = `Bearer ${token}`
			return config
		})
	}, [state.tokens?.access])

	const login = (obj: AuthInterface) => {
		setState({
			...state,
			...obj,
		})
	}
	const logout = () => {
		setState({})
		localStorage.clear()
		location.href = D_ROUTES.LOGIN
	}

	return <authContext.Provider value={{ ...state, login, isLoggedIn, logout }}>{children}</authContext.Provider>
}
