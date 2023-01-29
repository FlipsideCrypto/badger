import "@style/Dashboard/Dashboard.css";

const Dashboard = ({ children }) => {
    return (
        <div className="dashboardContent">
            {children}
        </div>
    )
}

export { Dashboard };