import "@/components/styles/globals.scss"
import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { AppProps } from "next/app"
import { useLayoutEffect, useState } from "react"
import { RoutesLoader } from "../components/RoutesLoader/RoutesLoader"
import { MANTINE_THEME } from "../config/config"
import { EMOTION_CACHE } from "../config/emotion-cache"
import { AuthProvider } from "../context/authContext"

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 0 } } }))

	useLayoutEffect(() => {
		document.documentElement.style.setProperty("--vh-fix", `${window.innerHeight}px`)
	}, [])
	useLayoutEffect(() => {
		const setViewportHeight = () => document.documentElement.style.setProperty("--vh-fix", `${window.innerHeight}px`)
		setViewportHeight()
		window.addEventListener("resize", setViewportHeight)

		return () => {
			window.removeEventListener("resize", setViewportHeight)
		}
	}, [])

	//@ts-ignore
	const Layout = Component.Layout || EmptyLayout
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider withGlobalStyles withNormalizeCSS emotionCache={EMOTION_CACHE} theme={MANTINE_THEME}>
				<AuthProvider>
					<RoutesLoader />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthProvider>
			</MantineProvider>
		</QueryClientProvider>
	)
}

const EmptyLayout = ({ children }: any) => children
