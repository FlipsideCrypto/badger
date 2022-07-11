import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi'

import ConnectBtn from "../ConnectBtn/ConnectBtn";

const Home = () => {
    let navigate = useNavigate()
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <>
            {address ?
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
                :
                <ConnectBtn />
            }
        </>
    )
}

export default Home;