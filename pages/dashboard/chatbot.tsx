import { ActionIcon, Box, Flex, Input, ScrollArea, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { AiFillRobot } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { IoSend } from "react-icons/io5"
import OverlayLoader from "../../components/Loaders/OverlayLoader"
import DashboardLayout from "../../layouts/DashboardLayout"
import { getChatResponse } from "../../services/DashboardServices/DashboardServices"

interface chatbotProps {}

interface Message {
	isBot?: boolean
	text: string
}
const Chatbot = ({}: chatbotProps) => {
	const theme = useMantineTheme()
	const [query, setQuery] = useState<string>("")
	const [messages, setMessages] = useState<Message[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const handleSend = () => {
		setLoading(true)
		getChatResponse(query)
			.then((data) => {
				setMessages((prev) => [
					...prev,
					{
						text: query,
					},
					{
						text: data.result,
						isBot: true,
					},
				])
			})
			.catch((err) => {
				setMessages((prev) => [
					...prev,
					{
						text: query,
					},
					{
						text: "I'm sorry, I don't know.",
						isBot: true,
					},
				])
			})
			.finally(() => {
				setLoading(false)
				setQuery("")
			})
	}
	const messagesVal = messages.map((message, idx) => {
		return (
			<Flex my={16} key={idx} gap={8}>
				{message.isBot ? (
					<ThemeIcon variant="light">
						<AiFillRobot color="black" size={24} />
					</ThemeIcon>
				) : (
					<ThemeIcon color="transparent">
						<BiUserCircle color="black" size={24} />
					</ThemeIcon>
				)}

				<Box>{message.text}</Box>
			</Flex>
		)
	})
	return (
		<Flex sx={{ height: "100%" }} direction="column">
			<AnimatePresence>{loading && <OverlayLoader />}</AnimatePresence>
			{messages.length === 0 && (
				<Flex align="center" justify="center" sx={{ height: "100%" }}>
					<Text align="center" c="dimmed" weight={600}>
						Feel free to ask me any questions you have, <br /> and I'll do my best to provide clear and concise explanations
					</Text>
				</Flex>
			)}
			<ScrollArea py={16} pr={32} type="hover" sx={{ flex: 1 }}>
				{messagesVal}
			</ScrollArea>
			<Flex align="center" gap={8}>
				<Input
					variant="unstyled"
					value={query}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSend()
						}
					}}
					onChange={(e) => setQuery(e.target.value)}
					px={8}
					sx={{ flex: 1, border: `1px solid ${theme.colors.gray[4]}`, borderRadius: theme.radius.sm }}
					size="lg"
					placeholder="Type your query"
					rightSection={
						<ActionIcon variant="filled" color="dark">
							<IoSend />
						</ActionIcon>
					}
				/>
			</Flex>
		</Flex>
	)
}
Chatbot.Layout = DashboardLayout
export default Chatbot
