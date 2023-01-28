import { ActionButton } from "@components";

const ActionTitle = ({ title, actions }) => {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
        }}>
            <h2>{title}</h2>

            {actions && <div style={{
                display: "flex",
                justifyContent: "flex-end",
            }}>
                {actions.map((action, index) => (
                    <ActionButton
                        key={index}
                        className={action.className}
                        onClick={action.onClick}
                        icon={action.icon}
                        afterText={action.text || action.afterText}
                    />
                ))}
            </div>}
        </div>
    )

}

export { ActionTitle };