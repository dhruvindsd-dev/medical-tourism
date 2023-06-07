import { Flex, Text } from "@mantine/core"
import Link from "next/link"
import { IoMdMedical } from "react-icons/io"
import { D_HOME_ROUTES } from "../../config/routes"

interface LogoProps {
	text?: boolean
	color?: "white" | "black"
	height?: number | string
	width?: number | string
}

const Logo = ({ text, color = "white", height = 32, width = 32 }: LogoProps) => {
	const arr = ["logo", "", `-${color}`]
	if (text) arr[1] = "-text"

	return (
		<Link href={D_HOME_ROUTES.OCR}>
			<Flex align="center" gap={8}>
				<IoMdMedical size={22} />
				<Text weight={700} size={24}>
					DavaAi
				</Text>
			</Flex>
		</Link>
	)
}
export default Logo
