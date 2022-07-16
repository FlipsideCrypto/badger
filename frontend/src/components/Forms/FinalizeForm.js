import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Grid, Divider, LinearProgress } from '@mui/material';

import axios from 'axios';
import { ethers } from 'ethers';
import proxyAbi from "../../Badger.json"
import cloneAbi from "../../BadgerSet.json"

import BigBox from "../Blocks/BigBox"
import CustomStepper from "../Blocks/CustomStepper"
import CollectionCard from "../Blocks/CollectionCard"
import MiniPreview from "../Blocks/MiniPreview"

const FinalizeForm = (props) => {
    const { 
        address, 
        signer,
        chain,
        badgeSetData, 
        setBadgeSetData,
        badgeData, 
        setBadgeData,
        contractAddress,
        setContractAddress,
        contractInitialized,
        setContractInitialized,
        setStage, 
        setBadgeId,
        lastInitializedTokenId
    } = props

    const [deploymentArgs, setDeploymentArgs] = useState();
    const [loading, setLoading] = useState([false, false, false, false]);
    const [btnSuccess, setBtnSuccess] = useState([false, false, false, false])
    const [btnMsg, setButtonMsg] = useState([
        'Badger uploads your images and Badge Set data to IPFS',
        'Transaction cloning the Badger base contract, using 40x less fees than regular deployment',
        "Your Badge Set contract clone has to be 'made real' with a transaction",
        'A transaction sends the bundled Badge info to the contract',
    ])
    const [errorMsg, setErrorMsg] = useState();
    
    const proxyHandlerContractAddress = chain?.name === 'polygon' ?
        process.env.REACT_APP_POLYGON_PROXY : 
        process.env.REACT_APP_MUMBAI_PROXY

    const apiConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    };
    var connectedClonedContract;

    const handleNext = () => {
        setStage('mintBadges')
    }

    const handleBack = () => {
        setBadgeId((badgeId) => badgeId-1)
        setStage('createBadge')
    }


    const handleIpfsUpload = () => {
        setLoading([true, false, false, false])

        // TODO: Remove this log
        // console.log('preview data',previewData)

        const formData = new FormData();

        // For all badges and the badge set, append image files
        formData.append('set_name', badgeSetData.name)
        formData.append('set_desc', badgeSetData.desc)
        formData.append('set_img', badgeSetData.imgFile)
        badgeData.forEach((badge) => {
            console.log(badge)
            formData.append('badge_imgs', badge.imgFile)
        })
        
        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/ipfs_pin/`, formData, apiConfig)
        .then((res) => {
                if (res.data['success']) {
                    console.log('Res', res.data)
                    let setUpdate = badgeSetData
                    setUpdate.ipfs_img = res.data.set_img_hash
                    setUpdate.contract_hash = res.data.set_hash

                    let badgeUpdate = badgeData
                    let badgeHashes = res.data.badge_img_hashes
                    badgeUpdate.forEach((badge, idx) => {
                        badge.img_hash = badgeHashes[idx]
                        badgeUpdate[idx] = badge
                    })

                    console.log('badgeUpdate', badgeUpdate)
                    setBadgeSetData(setUpdate)
                    setBadgeData(badgeUpdate)
                    setDeploymentArgs(res.data.deployment_args)
                    setLoading([false, false, false, false])
                    // TODO: Remove comment
                    // setBtnSuccess([true, false, false, false])
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

    const cloneContract = () => {
        setLoading([false, true, false, false])

        const proxyContract = new ethers.Contract(
            proxyHandlerContractAddress,
            proxyAbi,
            signer
        );

        // proxyContract.deploySet()
        // .then((transaction) => {
        //     transaction.wait()
        //     .then((res) => {
        //         console.log('Badge Set Cloned', res)

        //         setContractAddress(res.events[0].args.setAddress)
        //         setBtnSuccess([true, true, false, false])
        //         setLoading([false, true, false, false])
        //     })
        //     .catch((res) => {
        //         console.log('Error Cloning', res)
        //         setErrorMsg({'step' : 2, 'error': res})
        //         setLoading([false, false, false, false])
        //     })
        // })

        // TODO: Remove this -- just added for testing
        setBtnSuccess([true, true, false, false])
        setLoading([false, false, false, false])
    }

    const initializeContract = () => {
        setLoading([false, false, true, false])

        const formData = new FormData();
        formData.append('set_name', badgeSetData.name)
        formData.append('set_desc', badgeSetData.desc)
        formData.append('set_img_hash', badgeSetData.ipfs_img)
        formData.append('set_contract_address', contractAddress)
        formData.append('set_creator', address)
        formData.append('set_contract_uri_hash', badgeSetData.contract_hash)
        formData.append('chain', chain)

        // TODO: This needs to be moved to within the .then for after the tx is finalized.
        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/new_set/`, formData, apiConfig)
        .then((res) => {
                if (res.data['success']) {
                    setContractInitialized(true);
                    setLoading([false, false, false, false])
                    setBtnSuccess([true, true, true, false])
                } else {
                    console.log('Error with uploading set data to database:', res.data['error'])
                    setErrorMsg({'step' : 3, 'error': res.data['error']})
                    setLoading([false, false, false, false])
                }
            }
        )
        
        /* TODO: Move post request inside the .then

        connectedClonedContract = new ethers.Contract(
            contractAddress,
            cloneAbi,
            signer
        );

        connectedClonedContract.initialize(
            deploymentArgs.contract_uri_hash,
            deploymentArgs.description
        )
        .then((transaction) => {            
            transaction.wait()
            .then((res) => {
                // move post request here
            })
        })
        .catch((res) => {
            console.log('Error Initializing Contract:', res)
            setErrorMsg({'step' : 3, 'error': res})
            setLoading([false, false, false, false])
        })

        */
    }

    const uploadBadges = () => {
        setLoading([false, false, false, true])

        const formData = new FormData();

        let badgeArgs = []
        let tokenIds = []
        let badgeUpdate = badgeData
        badgeData.forEach((badge, idx) => {
            let tokenId = lastInitializedTokenId + idx
            badgeArgs.push([badge.name, badge.desc, badge.img_hash])
            tokenIds.push(tokenId)
            
            badgeUpdate[idx].token_id = tokenId
        })
        formData.append('badges_data', badgeUpdate)
        formData.append('set_address', contractAddress)

        console.log('tokenIds', tokenIds, 'badgeUpdate', badgeUpdate)

        // We need to move this to after the transaction.wait but this is here for testing just to be sure
        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/new_badges/`, formData, apiConfig)
        .then((res) => {
            if (res.data['success']) {
                setLoading([false, false, false, false])
                setBtnSuccess([true, true, true, true])
            } else {
                console.log('Error with uploading badges to database:', res.data['error'])
                setErrorMsg({'step' : 4, 'error': res.data['error']})
                setLoading([false, false, false, false])
            }
        })

        /* TODO: move the post request inside the .then

        connectedClonedContract.createBadgeTypeBundle(
            tokenIds,
            badgeArgs
        )
        .then((transaction) => {
            transaction.wait()
            .then((res) => {
                // move post request here                
            })
        })
        .catch((res) => {
            console.log('Error Uploading Badges:', res)
            setErrorMsg({'step' : 4, 'error': res})
            setLoading([false, false, false, false])
        })
        */
    }

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

    // Handles if they have completed a step then went back
    useEffect(() => {
        console.log('Stored Badge Data', badgeData)

        if (contractInitialized) {
            setBtnSuccess([true, true, true, false])
            return
        }

        if (contractAddress) {
            setBtnSuccess([true, true, false, false])
            return
        }

        if (badgeData[badgeData.length - 1].img_hash) {
            setBtnSuccess([true, false, false, false])
            return
        }
    }, [])


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
                            onClick={() => cloneContract()}
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
                            onClick={() => initializeContract()}
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
                            onClick={() => uploadBadges()}
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