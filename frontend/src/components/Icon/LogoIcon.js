
import "@style/Icon/LogoIcon.css"

const LogoIcon = ({ name, image }) => {
    return (
        <div className="logo__icon">
            <div className="logo__image" />

            <h3 className="logo__name">
                { name }
            </h3>
        </div>
    )
}

export { LogoIcon }