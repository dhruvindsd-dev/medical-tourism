interface NavbarProps {}
import { createStyles } from "@mantine/core"
import { SIDEBAR_WIDTH } from "../../../../../config/constants"

export const useStyles = createStyles((theme) => ({
	navbar: {
		position: "fixed",
		top: 0,
		left: SIDEBAR_WIDTH,
		right: 0,
		backgroundColor: theme.fn.lighten(theme.colors.yellow[0], 0.8),
		padding: ".5rem",
		height: "3rem",
		borderBottom: `1px solid ${theme.colors.gray[1]}`,
		[theme.fn.smallerThan("sm")]: {
			left: 0,
			width: "100%",
		},
	},
}))
const Navbar = ({}: NavbarProps) => {
	const { classes } = useStyles()
	return <div className={classes.navbar}>navbar</div>
}
export default Navbar
