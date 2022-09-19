import OrgSidebar from "./Sidebar/OrgSidebar";
import HelpSidebar from "./Sidebar/HelpSidebar";

import DashboardContent from "./Content/DashboardContent";
import WalletWrapper from "../Wallet/WalletWrapper";

import "../../style/Dashboard/Dashboard.css";

const Dashboard = ({ children }) => {
    // const [organizations, setOrganizations] = useState([]);
    const organizations = [
        {
            name: "Badger",
            avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4",
        }
    ]

    return (
        <WalletWrapper>
            <div className="dashboard">
                <OrgSidebar organizations={organizations} />
                <DashboardContent children={children} />
                <HelpSidebar />
            </div>
        </WalletWrapper>
    )
}

export default Dashboard;