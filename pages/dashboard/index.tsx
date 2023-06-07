import Dashboard from "../../components/pages/Dashboard/Dashboard"
import DashboardLayout from "../../layouts/DashboardLayout"

interface indexProps {}

const index = ({}: indexProps) => {
	return <Dashboard />
}
index.Layout = DashboardLayout
export default index
