import Header from '../Header/Header';

const DashboardContent = ({ children }) => {
    return (
        <div className="dashboard__content">
            <Header />
            {children}
        </div>
    )
}

export default DashboardContent;