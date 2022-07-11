import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi'

import ConnectBtn from "../Blocks/ConnectBtn";

const Landing = () => {
    let navigate = useNavigate()
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <>
            {address ?
                <Button
                    onClick={() => navigate('/home')}
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

export default Landing;