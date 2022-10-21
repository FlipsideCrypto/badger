import "@style/Dashboard/Sidebar/StatusIndicators/StatusIndicators.css";

// can, cannot, pending
const StatusIndicators = ({statuses}) => {
    return (
        <div className="status__indicators">
            {statuses.map((status, index) => (
                <div className="status__indicator" key={index}>
                    <div className={`status__indicator__circle ${status.status}`}></div>
                    <p>{status.name}</p>
                </div>
            ))}
        </div>
    ) 
}

export default StatusIndicators;