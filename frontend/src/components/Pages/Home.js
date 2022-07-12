import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi'

import ConnectBtn from "../Blocks/ConnectBtn";

const Home = () => {
    let navigate = useNavigate()
    const { address, isConnecting, isDisconnected } = useAccount();

    // TODO: Home page should give a logged in user the ability to navigate to any
    //          dashboard that they have access to. If an admin, they should be able 
    //          to navigate to create badges, manage badges, or create a new set.
    // TODO: Design this before jumping into it


    return (
        <>
            {address ?
                <Button
                    onClick={() => navigate('/create')}
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