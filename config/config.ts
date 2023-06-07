import { MantineThemeOverride } from "@mantine/core"
import axios from "axios"

export const BASE_URL = "http://127.0.0.1:8000"
export const AXIOS_INSTANCE = axios.create({
	baseURL: `${BASE_URL}/api/`,
})
export const MANTINE_THEME: MantineThemeOverride = {
	colorScheme: "light",
	cursorType: "pointer",
	colors: {
		yellow: ["#fff9e8", "#ffebbb", "#ffde8d", "#ffd15f", "#ffb703", "#d49800", "#a67700", "#785600", "#4a3500"],
	},
	primaryColor: "yellow",
	components: {
		Avatar: {
			styles(theme, params) {
				return {
					root: {
						border: "2px solid #fff",
						boxShadow: theme.shadows.md,
						borderRadius: "50%",
					},
				}
			},
		},
		Menu: {
			styles: (theme) => ({
				item: {
					height: "min-content",
					fontWeight: 500,
				},
			}),
		},
		Select: {
			styles: (theme) => ({
				item: {
					height: "min-content",
					fontWeight: 500,
				},
			}),
		},
	},
	globalStyles: (theme) => ({
		a: {
			color: theme.colors.yellow[5],
			margin: 0,
			display: "inline",
			height: "auto",
			textDecoration: "none",
			fontWeight: 500,
		},
	}),
}

export const MAP_STYLES = [
	{
		featureType: "all",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "all",
		stylers: [
			{
				color: "#f2f2f2",
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#686868",
			},
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "landscape",
		elementType: "all",
		stylers: [
			{
				color: "#f2f2f2",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "all",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "all",
		stylers: [
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road",
		elementType: "all",
		stylers: [
			{
				saturation: -100,
			},
			{
				lightness: 45,
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "all",
		stylers: [
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
			{
				lightness: "-22",
			},
			{
				visibility: "on",
			},
			{
				color: "#b4b4b4",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				saturation: "-51",
			},
			{
				lightness: "11",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text",
		stylers: [
			{
				saturation: "3",
			},
			{
				lightness: "-56",
			},
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [
			{
				lightness: "-52",
			},
			{
				color: "#9094a0",
			},
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.stroke",
		stylers: [
			{
				weight: "6.13",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.icon",
		stylers: [
			{
				weight: "1.24",
			},
			{
				saturation: "-100",
			},
			{
				lightness: "-10",
			},
			{
				gamma: "0.94",
			},
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#b4b4b4",
			},
			{
				weight: "5.40",
			},
			{
				lightness: "7",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "labels.text",
		stylers: [
			{
				visibility: "simplified",
			},
			{
				color: "#231f1f",
			},
		],
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "labels.text.fill",
		stylers: [
			{
				visibility: "simplified",
			},
			{
				color: "#595151",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{
				lightness: "-16",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#d7d7d7",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text",
		stylers: [
			{
				color: "#282626",
			},
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text.fill",
		stylers: [
			{
				saturation: "-41",
			},
			{
				lightness: "-41",
			},
			{
				color: "#2a4592",
			},
			{
				visibility: "simplified",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text.stroke",
		stylers: [
			{
				weight: "1.10",
			},
			{
				color: "#ffffff",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "geometry.fill",
		stylers: [
			{
				lightness: "-16",
			},
			{
				weight: "0.72",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [
			{
				lightness: "-37",
			},
			{
				color: "#2a4592",
			},
		],
	},
	{
		featureType: "transit",
		elementType: "all",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "off",
			},
			{
				color: "#eeed6a",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "geometry.stroke",
		stylers: [
			{
				visibility: "off",
			},
			{
				color: "#0a0808",
			},
		],
	},
	{
		featureType: "water",
		elementType: "all",
		stylers: [
			{
				color: "#b7e4f4",
			},
			{
				visibility: "on",
			},
		],
	},
]
