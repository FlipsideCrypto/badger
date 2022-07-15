import { useState, useRef } from 'react';
import { Box, Typography, Button, Grid, Divider, LinearProgress } from '@mui/material';

import axios from 'axios';

import BigBox from "../Blocks/BigBox"
import CustomStepper from "../Blocks/CustomStepper"
import CollectionCard from "../Blocks/CollectionCard"
import MiniPreview from "../Blocks/MiniPreview"

const FinalizeForm = (props) => {
    const { badgeSetData, badgeData, address, signer, setContractAddress, setStage, setBadgeId } = props

    const [deploymentArgs, setDeploymentArgs] = useState();
    const [loading, setLoading] = useState([false, false, false, false]);
    const [btnSuccess, setBtnSuccess] = useState([false, false, false, false])
    const [btnMsg, setButtonMsg] = useState([
        'Badger uploads your images and Badge Set data to IPFS',
        'Transaction cloning the Badger base contract, using 40x less fees than regular deployment',
        "Your Badge Set contract clone has to be 'made real' with a transaction",
        'Your Badge info is sent to the contract',
        'Move on to minting the new Badges to your members'
    ])
    const [errorMsg, setErrorMsg] = useState();

    const handleNext = () => {
        setStage('mintBadges')
        // window.scrollTo(0, 0);
    }

    const handleBack = () => {
        setBadgeId((badgeId) => badgeId-1)
        setStage('createBadge')
        // window.scrollTo(0,0)
    }


    const handleIpfsUpload = () => {
        setLoading([true, false, false, false])

        const formData = new FormData();
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        // For all badges and the badge set, append image files
        formData.append('set_name', badgeSetData.name)
        formData.append('set_desc', badgeSetData.desc)
        formData.append('set_img', badgeSetData.imgFile)
        badgeData.forEach((badge) => {
            console.log(badge)
            formData.append('badge_imgs', badge.imgFile)
        })

        console.log('formData', formData)

        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/ipfs_pin/`, formData, config)
        .then((res) => {
                console.log(res)
                if (res.data['success']) {
                    console.log('Result Success', res.data)
                    let setUpdate = badgeSetData
                    setUpdate.ipfs_img = res.data.ipfs_img
                    setUpdate.contract_hash = res.data.contract_hash
                    let badgeUpdate = badgeData

                    // how do we access the array we get returned?
                    // badgeUpdate.forEach((badge, idx) => {
                    //     badge.ipfs_img = res[]
                    // })
                    setLoading([false, false, false, false]);
                    setBtnSuccess([true, false, false, false]);
                } else {
                    console.log('Error with IPFS upload:', res.data['error'])
                    setErrorMsg({'step' : 1, 'error': res.data['error']})
                    setLoading([false, false, false, false])
                }
            }
        )
        .catch((error) => {
            console.log('Error with IPFS upload', error)
            setErrorMsg({'step' : 1, 'error': error})
            setLoading([false, false, false, false])
        })
    }

    // const cloneContract = () => {
    //     setLoading([false, true, false])

    //     const proxyContract = new ethers.Contract(
    //         proxyHandlerContractAddress,
    //         proxyAbi,
    //         signer
    //     );

    //     proxyContract.deploySet()
    //     .then((transaction) => {
    //         console.log('Making Clone...', transaction)
    //         transaction.wait()
    //         .then((res) => {
    //             console.log('Badge Set Cloned', res)

    //             setBadgeSetContract(res.events[0].args.setAddress)
    //             setBtnSuccess([true, true, false])
    //         })
    //         .catch((res) => {
    //             console.log('Error Cloning', res)
    //             // todo: error message
    //         })
    //         .then(
    //             setLoading([false, false, false])
    //         )
    //     })
    // }

    // const initializeContract = () => {
    //     setLoading([false, false, true])

    //     const clonedContract = new ethers.Contract(
    //         badgeSetContract,
    //         cloneAbi,
    //         signer
    //     );

    //     clonedContract.initialize(
    //         deploymentArgs.baseuri,
    //         deploymentArgs.contract_uri_hash,
    //         deploymentArgs.description
    //     )
    //     .then((transaction) => {
    //         console.log('Initializing Set...', transaction)
            
    //         transaction.wait()
    //         .then((res) => {
    //             console.log('Set Initialized.', res)
    //             setBtnSuccess([true, true, true])
    //         })
    //         .catch((res) => {
    //             console.log('Error Initializing', res)
    //             // todo: error message
    //         })
    //         .then(() => {
    //             setLoading([false, false, false])
    //             finalizeSet()
    //         })
    //     })
    // }

    // // Sends finalized data to api
    // const finalizeSet = async () => {
    //     const formData = new FormData();
    //     const config = {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //     };

    //     formData.append('contract_hash', deploymentArgs.contract_uri_hash)
    //     formData.append('contract_address', badgeSetContract)


    //     axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/finalize_set/`, formData, config)
    //     .then(res => {
    //         // TODO: Error
    //     })
    // }


    function buttonSuccessSx(btnIdx) {
        if (!btnSuccess[btnIdx]) return {}
        const style =  {
            ...(btnSuccess[btnIdx] && {
                bgcolor: '#A8FBB3',
                pointerEvents: 'none',
                opacity: '0.60'
            }),
        }

        return style
    }


    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={2} />

            <div style={{marginTop: '50px'}} />
            {/* <Grid container rowSpacing={{sm:4, md:4, lg:5}} columnSpacing={{sm:0, md:3, lg:5}} sx={{}}> */}
                {/* <Grid item xs={1} /> */}
                {/* <Grid item xs={10}>  */}
                <MiniPreview badgeData={badgeData} />
                {/* </Grid> */}
                {/* <Grid item xs={1} /> */}
            {/* </Grid> */}

            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                RUN TRANSACTIONS
            </Typography>
            <Divider 
                sx={{
                    mx: 'auto',
                    mb:'15px', 
                    width: '50%',
                    height: '3px'
                }}
            />

            <Typography variant="body1" sx={{mb:'30px', mx:'20%', textAlign: 'center'}}>
                Now that you have determined your Set and Badge info, it is time to put them on chain.
                There will be a total of 3 transactions for you to run to finalize your Set collection
                before moving on to minting your new Badges.
            </Typography>

            <Grid container rowSpacing={{sm:4, md:4, lg:5}} columnSpacing={{sm:0, md:3, lg:5}} sx={{textAlign: 'left'}}>
                <Grid item sm={0} md={2} lg={4} />
                <Grid item sm={12} md={8} lg={4} sx={{mt: '20px'}}>
                    <Box>
                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(0)}
                            disabled={false}
                            onClick={() => handleIpfsUpload()}
                        >
                            UPLOAD DATA TO IPFS
                        </Button>
                        
                        {loading[0] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[0]}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(1)}
                            disabled={!btnSuccess[0]}
                            onClick={() => handleIpfsUpload()}
                        >
                            CLONE CONTRACT
                        </Button>
                        
                        {loading[1] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[1]}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(2)}
                            disabled={!btnSuccess[1]}
                            onClick={() => handleIpfsUpload()}
                        >
                            INITIALIZE CONTRACT
                        </Button>
                        
                        {loading[2] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[2]}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(3)}
                            disabled={!btnSuccess[2]}
                            onClick={() => handleIpfsUpload()}
                        >
                            UPLOAD BADGES
                        </Button>
                        
                        {loading[3] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}

                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[3]}
                        </Typography>

                        <Button
                            variant="contained"
                            disabled={!btnSuccess[3]}
                            onClick={() => handleIpfsUpload()}
                        >
                            START MINTING
                        </Button>

                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[4]}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={0} md={2} lg={4} />

                {/* Row 2 for Buttons */}
                <Grid item sm={0} md={1} lg={2} />
                    <Grid item sm={3} md={2} lg={2}>
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleBack()}
                        >
                            BACK
                        </Button>
                    </Grid>
                    <Grid item sm={6} md={6} lg={4} />

                    <Grid item sm={3} md={2} lg={2}>
                        {btnSuccess[3] ?
                            <Button
                                variant="contained"
                                disabled={false}
                                onClick={() => handleNext()}
                            >
                                NEXT
                            </Button>
                            :
                            <Button
                                variant="contained"
                                disabled={true}
                                onClick={() => handleNext()}
                            >
                                NEXT
                            </Button>
                        }
                    </Grid>
                    <Grid item sm={0} md={1} lg={2} />
            </Grid>
        </div>
    )
}

export default FinalizeForm;