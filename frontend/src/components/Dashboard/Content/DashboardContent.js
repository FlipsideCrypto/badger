const DashboardContent = ({ children }) => {
    return (
        <div className="dashboard__content" style={{
            marginInline: "20px"
        }}>
            {children}
        </div>
    )
}

export default DashboardContent;