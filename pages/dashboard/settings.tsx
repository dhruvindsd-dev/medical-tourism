import { ActionIcon, Flex, Space, Text, ThemeIcon, Title, createStyles } from "@mantine/core"
import { useRouter } from "next/router"
import { AiFillShop } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { MdFace3 } from "react-icons/md"
import Salon from "../../components/pages/Dashboard/Settings/Salon"
import DashboardLayout from "../../layouts/DashboardLayout"

interface settingsProps {}

export const useStyles = createStyles((theme) => ({
	items: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
		gap: theme.spacing.sm,
	},
	item: {
		border: `1px solid ${theme.colors.gray[2]}`,
		borderRadius: theme.radius.sm,
		padding: theme.spacing.sm,
		transition: "border-color 0.2s ease, background-color 0.2s ease",
		cursor: "pointer",
		"&:hover": {
			borderColor: theme.colors.gray[5],
			backgroundColor: theme.fn.rgba(theme.colors.gray[0], 0.5),
		},
	},
}))

const data = [
	{
		title: "Salon",
		description: "Manage your Salon's Outlets here.",
		icon: <AiFillShop size={20} />,
		component: <Salon />,
	},
	{
		title: "Team",
		description: "Manage your Staff here.",
		icon: <FiUsers size={20} />,
	},
	{
		title: "Services",
		description: "Manage your Salon Services here.",
		icon: <MdFace3 size={20} />,
	},
]

const tabsType = data.map((i) => i.title)
const Settings = ({}: settingsProps) => {
	const router = useRouter()
	const { classes } = useStyles()
	const tab = router.query?.tab as string

	const selectedTab = tab ? data.find((i) => i.title === tab) : undefined
	if (selectedTab?.component)
		return (
			<div>
				<Flex align="center" mb={16}>
					<ActionIcon size="sm" onClick={() => router.push(router.pathname)} variant="subtle" radius="xl" color="gray">
						<IoIosArrowBack />
					</ActionIcon>
					<Text color="gray" size={12}>
						Back to settings
					</Text>
				</Flex>

				<Title order={3} weight={600}>
					{selectedTab.title} Settings
				</Title>

				<Text size={14} color="gray">
					{selectedTab.description}
				</Text>

				<Space h="xl" />
				{selectedTab.component}
			</div>
		)
	return (
		<div>
			<Title order={4} weight={600}>
				Settings
			</Title>
			<Text color="gray">Manage your Salon and team here.</Text>

			<Space h="xl" />
			{selectedTab ? (
				selectedTab.component
			) : (
				<div className={classes.items}>
					{data.map((i) => (
						<div onClick={() => router.push(`?tab=${i.title}`)} role="button" key={i.title} className={classes.item}>
							<ThemeIcon size="xl" radius="xl" variant="light">
								{i.icon}
							</ThemeIcon>
							<Text size={24} weight={600} mt={16} mb={-4}>
								{i.title}
							</Text>
							<Text size={12} c="gray">
								{i.description}
							</Text>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
Settings.Layout = DashboardLayout
export default Settings
