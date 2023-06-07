import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import OverlayLoader from "../components/Loaders/OverlayLoader"
import { D_HOME_ROUTES } from "../config/routes"
import { authContext } from "../context/authContext"
import { activateUser } from "../services/AuthService/AuthService"

interface activateProps {}

const Activate = ({}: activateProps) => {
	const router = useRouter()
	const mutation = useMutation(activateUser)
	const token = router.query.token as string
	const context = useContext(authContext)
	useEffect(() => {
		if (!router.isReady) return

		if (token) {
			mutation.mutate(token, {
				onSuccess: (data) => {
					context.login!(data)
					router.push(D_HOME_ROUTES.OCR)
				},
			})
		}
	}, [token, router.isReady])
	return (
		<div>
			<OverlayLoader />
		</div>
	)
}
export default Activate
