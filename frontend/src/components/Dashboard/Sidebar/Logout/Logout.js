import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => { 
    return (
        <a className="logout" href="#" onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
        }}>
            <FontAwesomeIcon icon={['fal', 'sign-out']} />
            <span>Logout</span>
        </a>
    )
}

export default Logout;