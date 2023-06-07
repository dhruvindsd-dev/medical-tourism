import { createStyles } from "@mantine/core"
import React from "react"
import Logo from "../components/Logo/Logo"

interface AuthLayoutProps {
	children: React.ReactNode
}
export const useStyles = createStyles((theme) => ({
	navbar: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
		padding: theme.spacing.md,
		[theme.fn.smallerThan("sm")]: {
			display: "flex",
			justifyContent: "center",
		},
	},
}))

const AuthLayout = ({ children }: AuthLayoutProps) => {
	const { classes } = useStyles()
	return (
		<>
			<div className={classes.navbar}>
				<Logo text height="25px" width="auto" />
			</div>
			{children}
		</>
	)
}
export default AuthLayout
