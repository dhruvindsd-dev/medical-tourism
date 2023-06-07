import { useQuery } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import { createContext } from "react"
import OverlayLoader from "../components/Loaders/OverlayLoader"
import { preloadData } from "../services/DashboardServices/DashboardServices"

interface dashboardDetailsContext {
	refetch: () => void
	salons: string[]
}

export const dashboardDetailsContext = createContext<Partial<dashboardDetailsContext>>({})

export const DashboardDetailsProvider = ({ children }: any) => {
	const query = useQuery(["dashboard-details-context"], preloadData, {
		initialData: {},
	})

	function refetch() {
		query.refetch()
	}

	return (
		<dashboardDetailsContext.Provider
			value={{
				...query.data,
				refetch,
			}}>
			<AnimatePresence>{query.isFetching && <OverlayLoader />}</AnimatePresence>
			{children}
		</dashboardDetailsContext.Provider>
	)
}
