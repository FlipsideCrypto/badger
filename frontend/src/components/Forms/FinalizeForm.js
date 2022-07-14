import { useState, useRef } from 'react';

import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, LinearProgress } from '@mui/material';

import BigBox from "../Blocks/BigBox"

import CustomStepper from "../Blocks/CustomStepper"


const FinalizeForm = (props) => {
    const { badgeSetData, badgeData, address, signer, setContractAddress, setStage } = props

    const [deploymentArgs, setDeploymentArgs] = useState();
    const [loading, setLoading] = useState([false, false, false]);
    const [btnSuccess, setBtnSuccess] = useState([false, false, false])
    const [btnMsg, setButtonMsg] = useState([
        'Badger uploads your images and Badge Set data to IPFS',
        'Transaction cloning the Badger base contract, using 40x less fees than regular deployment',
        "Your Badge Set contract clone has to be 'made real' with a transaction",
        'Your Badge info is sent to the contract',
        'Move on to minting the new Badges to your members'
    ])

    const handleNext = () => {
        setStage('mintBadges')
        window.scrollTo(0, 0);
    }

    const handleBack = () => {
        setStage('createBadge')
        window.scrollTo(0,0)
    }


    // const handleIpfsUpload = () => {
    //     setLoading([true, false, false])

    //     const formData = new FormData();
    //     const config = {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //     };

    //     formData.append('file', imageFile)
    //     formData.append('fileName', imageFile.name)
    //     formData.append('name', collectionName)
    //     formData.append('desc', collectionDesc)
    //     formData.append('creator_address', address)
    //     formData.append('chain', chain.name)
        
    //     let deploymentArgs;

    //     axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/new_set/`, formData, config)
    //     .then(res => {
    //             console.log('Uploading Data', res)
    //             if(res.data['success']) {
    //                 deploymentArgs = {
    //                     baseuri: '',
    //                     contract_uri_hash: res.data.contract_uri_hash,
    //                     description: res.data.description
    //                 }

    //                 setDeploymentArgs(deploymentArgs);
    //                 setBtnSuccess([true, false, false]);
    //             }
    //             else {
    //                 console.log('Invalid Upload')
    //                 setBtnSuccess([false, false, false]);
    //             }
    //         }
    //     )
    //     .then(() => {
    //         setLoading([false, false, false])
    //     });
    // }

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


    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={2} />
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
                <Grid item sm={0} md={2} lg={3} />
                <Grid item sm={12} md={8} lg={6}>
                    <BigBox>

                    </BigBox>
                </Grid>
                <Grid item sm={0} md={2} lg={3} />

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