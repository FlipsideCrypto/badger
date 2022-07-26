import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Divider, LinearProgress } from '@mui/material';

import axios from 'axios';
import { ethers } from 'ethers';
import proxyAbi from "../../Badger.json"
import cloneAbi from "../../BadgerSet.json"

import BigBox from "../Blocks/BigBox"
import CustomStepper from "../Blocks/CustomStepper"
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
    } = props

    const [deploymentArgs, setDeploymentArgs] = useState();
    const [loading, setLoading] = useState([false, false, false]);
    const [btnSuccess, setBtnSuccess] = useState([false, false, false])
    const [errorMsg, setErrorMsg] = useState({'step': null, 'error': null});
    
    const btnMsg = [
        'Badger uploads your images and Badge Set data to IPFS',
        'Transaction cloning the Badger base contract, using 40x less fees than regular deployment',
        "The Badge Set contract clone needs to be initialized with its first Badges",
    ]

    const proxyHandlerContractAddress = chain?.name === 'polygon' ?
        process.env.REACT_APP_POLYGON_PROXY : 
        process.env.REACT_APP_MUMBAI_PROXY

    var connectedClonedContract;

    const handleNext = () => {
        setStage('mintBadges')
    }

    const handleBack = () => {
        setBadgeId((badgeId) => badgeId-1)
        setStage('createBadge')
        window.scrollTo(0, 0);
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
        formData.append('set_desc', badgeSetData.description)
        formData.append('set_img', badgeSetData.imgFile)
        badgeData.forEach((badge) => {
            formData.append('badge_imgs', badge.imgFile)
        })

        
        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/ipfs_pin/`, formData, config)
        .then((res) => {
                if (res.data['success']) {
                    console.log('Res', res.data)
                    let setUpdate = badgeSetData
                    setUpdate.ipfs_img = res.data.set_img_hash
                    setUpdate.contract_hash = res.data.set_hash

                    let badgeUpdate = badgeData
                    let badgeHashes = res.data.badge_img_hashes
                    badgeUpdate.forEach((badge, idx) => {
                        badge.image_hash = badgeHashes[idx]
                        badgeUpdate[idx] = badge
                    })

                    setBadgeSetData(setUpdate)
                    setBadgeData(badgeUpdate)
                    setDeploymentArgs(res.data.deployment_args)
                    setBtnSuccess([true, false, false])
                    setErrorMsg({'step': null, 'error': null})
                } else {
                    console.log('Error with IPFS upload:', res.data['error'])
                    setErrorMsg({'step' : 0, 'error': res.data['error']})
                }
            }
        )
        .catch((error) => {
            console.log('Error with IPFS upload', error)
            setErrorMsg({'step' : 0, 'error': error})
        })
        .finally(() => {
            setLoading([false, false, false])
        })
    }

    const cloneContract = () => {
        setLoading([false, true, false, false])

        const proxyContract = new ethers.Contract(
            proxyHandlerContractAddress,
            proxyAbi,
            signer
        );

        proxyContract.deploySet()
        .then((transaction) => {
            transaction.wait()
            .then((res) => {
                console.log('Badge Set Cloned', res)

                setContractAddress(res.events[0].args.setAddress)
                setBtnSuccess([true, true, false])
                setErrorMsg({'step': null, 'error': null})
            })
            .catch((res) => {
                console.log('Error Cloning', res)
                if (typeof(res) == 'string')
                    setErrorMsg({'step' : 1, 'error': res})
                else
                    setErrorMsg({'step': 2, 'error': 'Unparseable Error. See Inspect Element -> Console'})

            })
            .finally(() => {
                setLoading([false, false, false])
             })
        })

        // TODO: Remove this -- just added for testing
        // setBtnSuccess([true, true, false])
        // setLoading([false, false, false])
        // setErrorMsg({'step': null, 'error': null})
    }

    const initializeContract = () => {
        setLoading([false, false, true])

        // TODO: Remove dummyContractAddress for just contractAddress
        // let dummyContractAddress = '0x0asf0saf0saf0saf0saf0as0f'

        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };
        const formData = new FormData();
        formData.append('set_name', badgeSetData.name)
        formData.append('set_desc', badgeSetData.description)
        formData.append('set_img_hash', badgeSetData.ipfs_img)
        formData.append('set_contract_address', contractAddress)
        formData.append('set_creator', address)
        formData.append('set_contract_uri_hash', badgeSetData.contract_hash)
        formData.append('chain', chain.name)

        let badgeArgs = []
        let badgeUpdate = badgeData
        badgeData.forEach((badge, idx) => {
            badgeArgs.push([badge.name, badge.description, badge.image_hash])            
            badgeUpdate[idx].token_id = idx
            badgeUpdate[idx].parent_address = contractAddress
        })
        formData.append('badges_data', JSON.stringify(badgeUpdate))

        
        connectedClonedContract = new ethers.Contract(
            contractAddress,
            cloneAbi,
            signer
        );

        console.log('Deployment Args', deploymentArgs.contract_uri_hash, deploymentArgs.description, badgeArgs)
        connectedClonedContract.initialize(
            deploymentArgs.contract_uri_hash,
            deploymentArgs.description,
            badgeArgs
        )
        .then((transaction) => {            
            transaction.wait()
            .then((res) => {
                axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/new_set/`, formData, config)
                .then((res) => {
                        if (res.data['success']) {
                            console.log('Uploading set to db successful.', res.data)
                            setContractInitialized(true);
                            setBtnSuccess([true, true, true])
                            setErrorMsg({'step': null, 'error': null})
                        } else {
                            console.log('Error with uploading set data to database:', res.data['error'])
                            setErrorMsg({'step' : 2, 'error': res.data['error']})
                        }
                    }
                )
                .finally(() => {
                    setLoading([false, false, false])
                })            
            })
        })
        .catch((res) => {
            console.log('Error Initializing Contract:', res)
            if (typeof(res) == 'string')
                setErrorMsg({'step' : 2, 'error': res})
            else {
                setErrorMsg({'step': 2, 'error': 'Unparseable Error. See Inspect Element -> Console'})
            }
            setLoading([false, false, false, false])
        })
    }

    function buttonSuccessSx(btnIdx) {
        if (btnIdx === errorMsg.step) 
            return {
                ...({
                    bgcolor: '#FBA8A8',
                })
            }


        if (btnSuccess[btnIdx]) 
            return {
                ...({
                    bgcolor: '#A8FBB3',
                    pointerEvents: 'none',
                    opacity: '0.60'
                }),
            }
    }

    // Handles if they have completed a step then went back
    useEffect(() => {
        if (contractInitialized) {
            setBtnSuccess([true, true, true])
            return
        }
        if (contractAddress) {
            setBtnSuccess([true, true, false])
            return
        }

        if (badgeData[badgeData.length - 1].image_hash) {
            setBtnSuccess([true, false, false])
            return
        }
    }, [])


    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={2} />

            <div style={{marginTop: '50px'}} />
            <MiniPreview badgeData={badgeData} />

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

                        {errorMsg.step === 0 ?
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px', color: '#FBA8A8'}}>
                                {errorMsg.error}
                            </Typography>
                            :
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                                {btnMsg[0]}
                            </Typography>
                        }

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

                        {errorMsg.step === 1 ?
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px', color: '#FBA8A8'}}>
                                {errorMsg.error}
                            </Typography>
                            :
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                                {btnMsg[1]}
                            </Typography>
                        }

                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(2)}
                            disabled={!btnSuccess[1]}
                            onClick={() => initializeContract()}
                        >
                            INITIALIZE BADGES
                        </Button>
                        
                        {loading[2] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}

                        {errorMsg.step === 2 ?
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px', color: '#FBA8A8'}}>
                                {errorMsg.error}
                            </Typography>
                            :
                            <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                                {btnMsg[2]}
                            </Typography>
                        }
                    </Box>
                </Grid>
                <Grid item sm={0} md={2} lg={4} />

                {/* Row 2 for Buttons */}
                <Grid item sm={0} md={1} lg={2} />
                    <Grid item sm={3} md={2} lg={2}>
                        <Button
                            variant="contained"
                            disabled={contractInitialized}
                            onClick={() => handleBack()}
                        >
                            BACK
                        </Button>
                    </Grid>
                    <Grid item sm={6} md={6} lg={4} />

                    <Grid item sm={3} md={2} lg={2}>
                        {btnSuccess[2] ?
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