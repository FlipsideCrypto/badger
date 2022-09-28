import "@style/Dashboard/Sidebar/StatusIndicators/StatusIndicators.css";

const StatusIndicators = () => { 
    const statuses = [ 
        {
            name: 'Can manage Organization',
            status: 'can'
        }, 
        {
            name: 'Can manage Badges',
            status: 'can'
        },
        { 
            name: 'Can manage Delegates',
            status: 'pending'
        },
        { 
            name: 'Can manage Badge Members',
            status: 'cannot'
        }
    ]

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