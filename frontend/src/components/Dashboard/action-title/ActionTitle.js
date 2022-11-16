import ActionButton from "@components/Button/ActionButton";

const ActionTitle = ({ title, actions }) => {
    return (
        <div style={{ 
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
        }}>
            <h2>{title}</h2>

            <div style={{
                display: "flex",
                justifyContent: "flex-end",
            }}>
                {actions.map((action, index) => (
                    <ActionButton
                        key={index}
                        className={action.className}
                        onClick={action.onClick}
                        icon={action.icon}
                        afterText={action.afterText}
                    />
                ))}
            </div>
        </div>
    )

}

export default ActionTitle;