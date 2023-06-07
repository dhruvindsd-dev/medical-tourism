import { AXIOS_INSTANCE } from "../../config/config"
import { DASHBOARD_URL } from "../../config/endpoints"

export const preloadData = async () => AXIOS_INSTANCE.get(DASHBOARD_URL.preloadData).then(({ data }) => data)

export const sendOcrData = async (data: any) => AXIOS_INSTANCE.post(DASHBOARD_URL.ocr, data).then(({ data }) => data)
export const getChatResponse = async (query: any) =>
	AXIOS_INSTANCE.get(DASHBOARD_URL.chat_bot, {
		params: {
			query,
		},
	}).then(({ data }) => data)
