import { Flex, Group, Text, createStyles, rem, useMantineTheme } from "@mantine/core"
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { GrDocument, GrFormClose } from "react-icons/gr"
import { MdCloudUpload } from "react-icons/md"
import { sendOcrData } from "../../../services/DashboardServices/DashboardServices"
import OverlayLoader from "../../Loaders/OverlayLoader"
import OcrResponse from "./OcrResponse"
interface DashboardProps {}

export const useStyles = createStyles((theme) => ({
	wrapper: {},
}))
const loading_sentences = [
	"Analyzing document structure...",
	"Extracting key information...",
	"OCR engine initializing...",
	"Scanning medical data...",
	"Verifying data integrity...",
	"Processing images...",
	"Cross-referencing medical terminology...",
	"Parsing handwritten notes...",
	"OCR algorithms crunching numbers...",
	"Formatting results...",
]
const Dashboard = ({}: DashboardProps) => {
	const theme = useMantineTheme()
	const [loading, setLoading] = useState<null | string>(null)
	const [data, setData] = useState<null | string>(null)
	const handleSubmit = (files: File[]) => {
		const formData = new FormData()
		files.forEach((file) => {
			formData.append("files", file)
		})
		setLoading(loading_sentences[Math.floor(Math.random() * loading_sentences.length)])
		const interval = setInterval(() => {
			setLoading(loading_sentences[Math.floor(Math.random() * loading_sentences.length)])
		}, 3000)
		sendOcrData(formData).then((data) => {
			clearInterval(interval)
			setLoading(null)
			setData(data)
		})
	}

	return !!data ? (
		<OcrResponse {...data} />
	) : (
		<Flex sx={{ height: "100%" }} align="center" justify="center">
			<AnimatePresence>{loading && <OverlayLoader text={loading} />}</AnimatePresence>
			<Dropzone
				onDrop={(files) => {
					handleSubmit(files)
				}}
				onReject={(files) => console.log("rejected files", files)}
				maxSize={3 * 1024 ** 2}
				accept={PDF_MIME_TYPE}
				sx={{ width: "70%", backgroundColor: "transparent" }}>
				<Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: "none" }}>
					<Dropzone.Accept>
						<MdCloudUpload size={32} />
					</Dropzone.Accept>
					<Dropzone.Reject>
						<GrFormClose size={32} />
					</Dropzone.Reject>
					<Dropzone.Idle>
						<GrDocument size={32} />
					</Dropzone.Idle>

					<div>
						<Text size="xl" inline weight={600}>
							Drag your report's here or click to select them, to get a analysis
						</Text>
						<Text size="sm" color="dimmed" inline mt={7}>
							Your report should not be larger than 3MB
						</Text>
					</div>
				</Group>
			</Dropzone>
		</Flex>
	)
}
export default Dashboard
