import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate()

    return (
        <Button
            onClick={() => navigate('/manage')}
            variant="contained"
            sx={{ 
                mt: '400px', 
                display: 'flex',
                alignSelf: 'center', 
                mx: 'auto', 
                width: '30%'
            }}
        >
            ENTER APP
        </Button>
    )
}

export default Home;