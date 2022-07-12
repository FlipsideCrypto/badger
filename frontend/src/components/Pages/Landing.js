import { Button, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi'

import ConnectBtn from "../Blocks/ConnectBtn";

const Landing = () => {
    let navigate = useNavigate()
    const { address, isConnecting, isDisconnected } = useAccount();

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className='page-margin-left'>
            <Grid container spacing={0} sx={{textAlign: 'left', mt: '20vh'}}>
                <Grid item xs={9} sm={8} lg={7}>
                    <Typography variant="h1">
                        Effortlessly create and distribute on-chain Badges for your community 
                        members to display and track their roles, permissions, and accolades.
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={4} lg={5} sx={{flexGrow: 1}}>
                    <Typography variant="h2">
                        IMAGE
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={6} md={4} lg={3} sx={{mt: '40px'}}>
                    {address ?
                        <Button
                            onClick={() => navigate('/create')}
                            variant="contained"
                            sx={{ 
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            ENTER APP
                        </Button>
                        :
                        <ConnectBtn enterApp={true} />
                    }
                </Grid>
                <Grid item xs={4} sm={6} md={8} lg={9} />

                <div className='page-divider' style={{paddingTop: '50vh', width:'100%'}} />

                <Grid item xs={6} sm={6} md={5}>
                    <Typography variant="h2">
                        Badge-ify the roles that define the gates of your organization.                    
                    </Typography>

                    <Typography variant="body1" sx={{mt: '20px'}}>
                        With the metadata of every badge living on-chain, you can define root-level 
                        permissions for omni-platform access gates and immediately step into the digital 
                        world with managed roles.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={5} md={6}>
                    Maybe token component view
                </Grid>
                <Grid item xs={0} sm={1} xl={2} />

                <div className='page-divider' style={{paddingTop: '50vh', width:'100%'}} />

                <Grid item xs={6} sm={6} md={5}>
                    <Typography variant="h2">
                        Keep the hierarchy clear and simple to manage.                   
                    </Typography>

                    <Typography variant="body1" sx={{mt: '20px'}}>
                        Like blocks, Badger Badges play a critical role in defining and maintain the structure 
                        of it's larger part. Handled by the admins, the badges are assigned to those vital 
                        to the operation with the help of a wallet-bound ERC-1555 token that can only be 
                        transferred by the admins.
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={5} md={6} lg={5}>
                    <Box sx={{maxWidth: '100%', maxHeight: '40vh', height: '100%', ml: 'auto', mr:'0', mt:'30px'}}>
                        <img 
                            alt="Admin To Contributor" 
                            src={'/admintocontributor.png'} 
                            style={{width: '100%', height: '100%', objectFit: 'contain'}}
                        />
                    </Box>
                </Grid>
                <Grid item xs={0} sm={1} />


                <div className='page-divider' style={{paddingTop: '50vh', width:'100%'}} />

                <Grid item xs={8} sm={6} md={5}>
                    <Box sx={{mt: '30px'}}>
                        <Typography variant="h2">
                            Query the permissions of your organization instantly.            
                        </Typography>

                        <Typography variant="body1" sx={{mt: '20px'}}>
                            With the badges minted to your community there's no additional setup needed. 
                            You can query your community based on the roles and permissions you've set with 
                            your favorite blockchain data provider.
                        </Typography>

                        <Grid container>
                            <Grid item xs={8} sm={6} sx={{mt: '40px'}}>
                                <Button
                                    onClick={() => openInNewTab('https://app.flipsidecrypto.com/velocity?nav=Discover')}
                                    variant="contained"
                                    sx={{ 
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    VIEW FLIPSIDE QUERY
                                </Button>
                            </Grid>
                            <Grid item xs={4} sm={6} />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={0} sm={1} />
                <Grid item xs={4} sm={4} md={5} lg={5}>
                    <Box sx={{maxWidth: '100%', maxHeight: '40vh', height: '100%', ml: 'auto', mr:'0'}}>
                        <img 
                            alt="Admin To Contributor" 
                            src={'/querycode.svg'} 
                            style={{width: '100%', height: '100%', objectFit: 'contain'}}
                        />
                    </Box>
                </Grid>
                <Grid item xs={0} sm={1} />

                {/* <Grid item xs={2} sm={6} md={7} /> */}

                

                <div className='page-divider' style={{paddingTop: '50vh', width:'100%'}} />

                <div className='page-margin-right'>
                    <Grid container spacing={0}>
                        <Grid item xs={1} xl={3}/>
                        <Grid item xs={10} xl={6}>
                            <Typography variant="h2" sx={{textAlign: 'center', }}>
                                Step into the new world enabled by a community with on-chain Badges.                   
                            </Typography>

                            <Typography variant="body1" sx={{mt: '20px'}}>
                                
                            </Typography>
                        </Grid>
                        <Grid item xs={1} xl={3}/>
                    </Grid>
                </div>

                <div className='page-divider' style={{paddingTop: '50vh', width:'100%'}} />

                <Grid item xs={10} sm={9} lg={6}>
                    <Typography variant="h2">
                        Create your organization and setup the roles of your organization in under 120 seconds now!
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={3} lg={6} sx={{flexGrow: 1}}>
                    <Typography variant="h2">
                        IMAGE
                    </Typography>
                </Grid>

                <Grid item xs={8} sm={6} md={4} lg={3} sx={{mt: '40px'}}>
                    {address ?
                        <Button
                            onClick={() => navigate('/create')}
                            variant="contained"
                            sx={{ 
                                display: 'flex',
                                width: '100%',
                            }}
                        >
                            ENTER APP
                        </Button>
                        :
                        <ConnectBtn enterApp={true} />
                    }
                </Grid>
                <Grid item xs={4} sm={6} md={8} lg={9} />
                <div className='page-divider' style={{paddingTop: '20vh', width:'100%'}} />
            </Grid>
        </div>
    )
}

export default Landing;