import { Loader, MantineNumberSize, Text } from "@mantine/core"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { ADD_OPACITY_ANIMATION, ADD_OPACITY_ANIMATION_DELAY } from "../../animation/animation"

import { createStyles } from "@mantine/core"

export const useStyles = createStyles((theme) => ({
	container: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: theme.fn.rgba(theme.white, 0.9),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		gap: theme.spacing.md,
		zIndex: 1000,
	},
}))

interface OverlayLoaderProps {
	size?: MantineNumberSize
	disableDelay?: boolean
	position?: "top" | "middle"
	text?: string
}

const OverlayLoader = ({ size = "sm", disableDelay, position = "middle", text }: OverlayLoaderProps) => {
	const { classes } = useStyles()
	const styles: React.CSSProperties = {}
	if (position === "middle") styles.alignItems = "center"
	else if (position === "top") {
		styles.alignItems = "flex-start"
		styles.paddingTop = "25%"
	}

	return (
		<motion.div {...(disableDelay ? ADD_OPACITY_ANIMATION : ADD_OPACITY_ANIMATION_DELAY)} className={classes.container} style={styles}>
			<Loader size={size} />
			<AnimatePresence mode="wait">
				{!!text && (
					<motion.div key={text} {...ADD_OPACITY_ANIMATION}>
						<Text mt="md" ml="md">
							{text}
						</Text>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
export default OverlayLoader
