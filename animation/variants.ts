import { Variants } from "framer-motion"

export const OPACITY_VARIANTS: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
}

export const OPACITY_VARIANTS_DELAY: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { delay: 0.3 } },
	exit: { opacity: 0 },
}
