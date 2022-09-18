import OrgSidebar from "./Sidebar/OrgSidebar";
import HelpSidebar from "./Sidebar/HelpSidebar";

import DashboardContent from "./Content/DashboardContent";

import "../../style/Dashboard/Dashboard.css";

const Dashboard = () => {
    // const [organizations, setOrganizations] = useState([]);
    const organizations = [
        {
            name: "Badger",
            avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4",
        }
    ]

    return (
        <div className="dashboard">
            <OrgSidebar organizations={organizations} />
            <DashboardContent />
            <HelpSidebar />
        </div>
    )
}

export default Dashboard;