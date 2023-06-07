interface SidebarProps {}
import { Flex, Stack, createStyles, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useRouter } from "next/router"
import { BiCamera } from "react-icons/bi"
import { GiDoctorFace } from "react-icons/gi"
import { RiCustomerService2Line } from "react-icons/ri"
import { SIDEBAR_HEIGHT, SIDEBAR_WIDTH } from "../../../../../config/constants"
import { D_HOME_ROUTES } from "../../../../../config/routes"
import Logo from "../../../../Logo/Logo"

export const useStyles = createStyles((theme) => ({
	sidebar: {
		backgroundColor: theme.fn.lighten(theme.colors.yellow[0], 0.8),
		borderRight: `1px solid ${theme.colors.gray[1]}`,
		height: "var(--vh-fix)",
		position: "fixed",
		width: SIDEBAR_WIDTH,
		top: 0,
		padding: "1rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		[theme.fn.smallerThan("sm")]: {
			position: "initial",
			height: SIDEBAR_HEIGHT,
			flexDirection: "row",
			padding: "0",
			width: "100%",
			borderTop: `1px solid ${theme.colors.gray[1]}`,
			borderRight: "none",
		},
	},
	item: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: ".5rem 1rem",
		fontWeight: 600,
		gap: ".5rem",
		color: theme.black,
		borderRadius: theme.radius.sm,
		cursor: "pointer",
		'&[data-active="true"]': {
			backgroundColor: theme.colors.yellow[0],
		},
		[theme.fn.smallerThan("sm")]: {
			fontSize: ".5rem",
			flexDirection: "column",
			textTransform: "uppercase",
			gap: ".25rem",
			padding: ".5rem",
			borderRadius: 0,
			flex: 1,
		},
	},

	button: {
		width: "100%",
		color: theme.black,
		'&[data-active="true"]': {
			backgroundColor: theme.colors.yellow[0],
		},
	},
	logo: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},
}))

const controls = [
	{
		name: "OCR",
		icon: <BiCamera size={20} />,
		route: D_HOME_ROUTES.OCR,
	},
	{
		name: "ChatBot",
		icon: <RiCustomerService2Line size={20} />,
		route: D_HOME_ROUTES.CHATBOT,
	},
	{
		name: "Doctors",
		icon: <GiDoctorFace size={20} />,
		route: D_HOME_ROUTES.DOCTORS,
	},
]
const Sidebar = ({}: SidebarProps) => {
	const { classes } = useStyles()
	const theme = useMantineTheme()
	const isMobile = useMediaQuery("(max-width: 768px)")
	const router = useRouter()

	const items = controls.map((i) => <Item key={i.name} className={classes.item} label={i.name} icon={i.icon} onClick={() => router.push(i.route)} isActive={router.asPath === i.route} />)
	return (
		<div className={classes.sidebar}>
			{!isMobile && <Logo width="auto" text color="black" />}
			{!isMobile ? <Stack spacing={8}>{items}</Stack> : items}
			<div></div>
			{/* <Item className={classes.item} label="Settings" icon={<FiSettings size={20} />} onClick={() => router.push(D_HOME_ROUTES.SETTINGS)} isActive={router.asPath === D_HOME_ROUTES.SETTINGS} /> */}
		</div>
	)
}
export default Sidebar

interface ItemProps {
	label: React.ReactNode
	icon: React.ReactNode
	onClick: () => void
	isActive: boolean
	className: string
}
const Item = ({ label, icon, onClick, isActive, className }: ItemProps) => (
	<div role="button" className={className} data-active={isActive} onClick={onClick}>
		<Flex align="center">{icon}</Flex>
		<div>{label}</div>
	</div>
)
