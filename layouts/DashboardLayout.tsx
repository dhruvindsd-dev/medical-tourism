import { createStyles } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { ADD_OPACITY_ANIMATION } from "../animation/animation"
import Sidebar from "../components/pages/Dashboard/Layout/Sidebar/Sidebar"
import { SIDEBAR_HEIGHT, SIDEBAR_WIDTH } from "../config/constants"
import { DashboardDetailsProvider } from "../context/dashboardDetailsContext"

interface DashboardLayoutProps {
	children: React.ReactNode
	p?: number
}

export const useStyles = createStyles((theme) => ({
	wrapper: {
		display: "grid",
		gridTemplateColumns: `${SIDEBAR_WIDTH} auto`,
		[theme.fn.smallerThan("sm")]: {
			gridTemplateColumns: "1fr",
		},
	},
	wrapper_right: {
		height: "var(--vh-fix)",
		padding: ".75rem",
		overflowY: "auto",
		backgroundImage: "linear-gradient(0deg,#fff,#fffaee)",
		[theme.fn.smallerThan("sm")]: {
			height: `calc(var(--vh-fix) - ${SIDEBAR_HEIGHT})`,
		},
	},
	wrapper_left: {
		position: "relative",
		[theme.fn.smallerThan("sm")]: {
			height: SIDEBAR_HEIGHT,
			backgroundColor: theme.colors.yellow[0],
			order: 2,
		},
	},
}))

const DashboardLayout = ({ children, p }: DashboardLayoutProps) => {
	const router = useRouter()
	const { classes } = useStyles()
	return (
		<DashboardDetailsProvider>
			<div className={classes.wrapper}>
				<div className={classes.wrapper_left}>
					<Sidebar />
				</div>
				<div style={{ padding: p }} className={classes.wrapper_right}>
					<AnimatePresence mode="wait">
						<motion.div style={{ height: "100%" }} {...ADD_OPACITY_ANIMATION} key={router.pathname}>
							{children}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</DashboardDetailsProvider>
	)
}
export default DashboardLayout
