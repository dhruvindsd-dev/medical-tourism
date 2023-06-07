import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import { useCallback, useState } from "react"
import { MAP_STYLES } from "../../config/config"
import DashboardLayout from "../../layouts/DashboardLayout"

interface doctorsProps {}
const containerStyle = {
	width: "100%",
	height: "100%",
}

const markerData = [
	{
		doctor_name: "Calambur Narasimhan",
		lat: 17.426439787878184,
		lng: 78.45110797031153,
		consulting_fee: 500,
	},
	{
		doctor_name: "Ajay Bahl",
		lat: 30.765227305465647,
		lng: 76.77497441913326,
		consulting_fee: 800,
	},
	{
		doctor_name: "Gino A. Kurian",
		lat: 10.748460356986175,
		lng: 79.10600813000184,
		consulting_fee: 700,
	},
	{
		doctor_name: "Sandeep D Seth",
		lat: 28.56525584089571,
		lng: 77.2167103860036,
		consulting_fee: 1200,
	},
	{
		doctor_name: "Srilakshmi M. Adhyapak",
		lat: 12.931075203684083,
		lng: 77.61110039601168,
		consulting_fee: 1000,
	},
]
const libraries = ["places"]
const Doctors = ({}: doctorsProps) => {
	const [map, setMap] = useState<google.maps.Map>()
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyAv9t8gSzWmvY8VPJ_ronwGMdivJj6jYsU",
		libraries,
	})
	console.log({ isLoaded })

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		map.setCenter({
			lat: 39.55,
			lng: -105.215,
		})
		map.setZoom(4)
		setMap(map)
	}, [])

	if (!isLoaded) return null
	return (
		<GoogleMap
			zoom={3}
			options={{
				styles: MAP_STYLES,
				fullscreenControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
				zoomControl: true,
				maxZoom: 12,
				minZoom: 3,
			}}
			mapContainerStyle={containerStyle}
			// onUnmount={onUnmount}
			onLoad={onLoad}>
			<MarkerF position={{ lat: 20, lng: 78 }} onClick={() => {}} />
			{markerData.map((marker, idx) => (
				<MarkerF position={{ lat: marker.lat, lng: marker.lng }} onClick={() => {}} key={idx} />
			))}
		</GoogleMap>
	)
}
Doctors.Layout = ({ children }: any) => <DashboardLayout p={0}>{children} </DashboardLayout>
export default Doctors
