import { Table, Text } from "@mantine/core"

interface OcrResponseProps {
	string: string
	mdf_json: {
		test_name: string
		result: string
		unit: string
		type: string
		reference_interval: string
	}[]
}

const OcrResponse = ({ string, mdf_json }: OcrResponseProps) => {
	return (
		<div>
			<Text weight={600} size={24}>
				Ocr Response
			</Text>
			<Text sx={{ whiteSpace: "break-spaces" }} component="pre" dangerouslySetInnerHTML={{ __html: string }}></Text>
			<br />
			<Text weight={600} size={24}>
				Your Data
			</Text>

			<Table withBorder mt={8} p={16}>
				<thead>
					<tr>
						<td>
							<b>Test Name</b>
						</td>
						<td>
							<b>Result </b>
						</td>
						<td>
							<b>Type</b>
						</td>
						<td>
							<b>Reference Range</b>
						</td>
					</tr>
				</thead>
				<tbody>
					{mdf_json.map((item, index) => (
						<tr key={index}>
							<td>{item.test_name}</td>
							<td>
								{item.result} {item.unit}
							</td>
							<td>{item.type ? item.type : "-"}</td>
							<td>{item.reference_interval ? item.reference_interval : "-"}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}
export default OcrResponse
