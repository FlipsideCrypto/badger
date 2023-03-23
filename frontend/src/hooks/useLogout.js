import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();


    const logout = () => {
        document.cookie = 'sessionid=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

        navigate("/dashboard/")
    }

    return { logout }
}

export { useLogout }