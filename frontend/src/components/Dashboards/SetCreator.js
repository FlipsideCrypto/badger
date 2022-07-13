import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSigner, useAccount, useNetwork } from 'wagmi'
import { ethers } from "ethers";
import proxyAbi from "../../Badger.json"
import cloneAbi from "../../BadgerSet.json"

import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, CircularProgress, LinearProgress } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"

const SetCreator = (props) => {
    let navigate = useNavigate();

    const { badgeSetContract, setBadgeSetContract, setStage} = props;

    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner();
    const { chain, chains } = useNetwork();
    
    const proxyHandlerContractAddress = chain?.name == 'polygon' ?
        process.env.REACT_APP_POLYGON_PROXY : 
        process.env.REACT_APP_MUMBAI_PROXY
    // const proxyHandlerContractAddress = process.env.REACT_APP_MUMBAI_PROXY;

    const [collectionName, setCollectionName] = useState('Badger Badges');
    const [collectionDesc, setCollectionDesc] = useState('Your set description will appear at the top of your collection on popular marketplaces and other token viewing apps.');
    const [imageFile, setImageFile] = useState();

    const [deploymentArgs, setDeploymentArgs] = useState();
    const [loading, setLoading] = useState([false, false, false]);
    const [btnSuccess, setBtnSuccess] = useState([false, false, false])
    const [btnMsg, setButtonMsg] = useState([
        'Badger uploads your image and Badge Set data to IPFS',
        'Transaction cloning the Badger base contract, using 40x less fees than regular deployment',
        "Your Badge Set contract clone has to be 'made real' with a transaction.",
        'Move on to creating the Badges for your new set.'
    ])

    const fileInput = useRef();

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
      };

    const selectImage = (event) => {
        setImageFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setCollectionName(event.target.value)
    }

    const handleDescChange = (event) => {
        setCollectionDesc(event.target.value)
    }

    const handleIpfsUpload = () => {
        setLoading([true, false, false])

        const formData = new FormData();
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        formData.append('file', imageFile)
        formData.append('fileName', imageFile.name)
        formData.append('name', collectionName)
        formData.append('desc', collectionDesc)
        formData.append('creator_address', address)
        formData.append('chain', chain.name)
        
        let deploymentArgs;

        axios.post(`${process.env.REACT_APP_API_URL}/badges/new_set/`, formData, config)
        .then(res => {
                console.log('Uploading Data', res)
                if(res.data['success']) {
                    deploymentArgs = {
                        baseuri: '',
                        contract_uri_hash: res.data.contract_uri_hash,
                        description: res.data.description
                    }

                    setDeploymentArgs(deploymentArgs);
                    setBtnSuccess([true, false, false]);
                }
                else {
                    console.log('Invalid Upload')
                    setBtnSuccess([false, false, false]);
                }
            }
        )
        .then(() => {
            setLoading([false, false, false])
        });
    }

    const cloneContract = () => {
        setLoading([false, true, false])

        const proxyContract = new ethers.Contract(
            proxyHandlerContractAddress,
            proxyAbi,
            signer
        );

        proxyContract.deploySet()
        .then((transaction) => {
            console.log('Making Clone...', transaction)
            transaction.wait()
            .then((res) => {
                console.log('Badge Set Cloned', res)

                setBadgeSetContract(res.events[0].args.setAddress)
                setBtnSuccess([true, true, false])
            })
            .catch((res) => {
                console.log('Error Cloning', res)
                // todo: error message
            })
            .then(
                setLoading([false, false, false])
            )
        })
    }

    const initializeContract = () => {
        setLoading([false, false, true])

        const clonedContract = new ethers.Contract(
            badgeSetContract,
            cloneAbi,
            signer
        );

        clonedContract.initialize(
            deploymentArgs.baseuri,
            deploymentArgs.contract_uri_hash,
            deploymentArgs.description
        )
        .then((transaction) => {
            console.log('Initializing Set...', transaction)
            
            transaction.wait()
            .then((res) => {
                console.log('Set Initialized.', res)
                setBtnSuccess([true, true, true])
            })
            .catch((res) => {
                console.log('Error Initializing', res)
                // todo: error message
            })
            .then(() => {
                setLoading([false, false, false])
                finalizeSet()
            })
        })
    }

    // Sends finalized data to api
    const finalizeSet = async () => {
        const formData = new FormData();
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        formData.append('contract_hash', deploymentArgs.contract_uri_hash)
        formData.append('contract_address', badgeSetContract)


        axios.post(`${process.env.REACT_APP_API_URL}/badges/finalize_set/`, formData, config)
        .then(res => {
            // TODO: Error
        })
    }

    useEffect(() => {        
        if(!chain) {
            navigate('/')
        }
    }, [])

    const logInfo = () => {
        console.log('BtnSuccess', btnSuccess)
        console.log('BtnLoading', loading)
    }

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                NEW SET
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
                Badge Sets are individual token collections that can represent anything within your community. 
                Badges are contained within a Set, like awards have categories and roles are in an organization. 
                A Set will be it's own contract while Badges are tokens within that contract.
            </Typography>

            <Grid container rowSpacing={1} columnSpacing={2} sx={{textAlign: 'left'}}>
                <Grid item xs={6}>
                    <BigBox>
                        <FormControl sx={{width: '100%', margin:'auto', my:'20px', alignItems:'center'}}>
                            <TextField 
                                label="Collection Name"
                                onChange={handleNameChange}
                                sx={{width: '90%'}}
                            />
                            
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Name for the Badge Set
                                </FormHelperText>
                            </Box>
                        </FormControl>
                        <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
                            <TextField 
                                multiline
                                rows={12}
                                label="Collection Description"
                                onChange={handleDescChange}
                                sx={{width: '90%'}}
                            />
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Description of the Badge Set
                                </FormHelperText>
                            </Box>
                        </FormControl>

                        <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
                            <label htmlFor="contained-button-file" style={{width: '90%'}}>
                                <Input 
                                    sx={{display: 'none'}} 
                                    ref={fileInput}
                                    accept="image/*" 
                                    id="contained-button-file" 
                                    multiple type="file" 
                                    onChange={selectImage}
                                />
                                <Button 
                                    sx={{width: '100%', margin:'auto', borderStyle: 'dashed'}}
                                    variant='outlined'
                                    onClick={() => fileInput.current.click()}
                                >
                                    <Typography variant="body1" sx={{alignSelf: 'baseline'}}>
                                        {imageFile ? imageFile.name : 'Upload Image'}
                                    </Typography>
                                </Button>
                                <FormHelperText>
                                    Image for the Badge Set contract collection
                                </FormHelperText>
                            </label>
                        </FormControl>
                    </BigBox>
                </Grid>

                <Grid item xs={6}>
                    <BigBox>
                        <CollectionCard
                            imageFile={imageFile}
                            name={collectionName}
                            description={collectionDesc}
                        />
                    </BigBox>
                </Grid>
            </Grid>

            <Box 
                sx={{
                    display: 'flex', 
                    flexDirection:'column',
                    width: '60%',
                    margin: 'auto',
                    mt: '50px'
                }}
            >
                <Typography variant="h2" sx={{textAlign: 'center'}}>
                    FINALIZE THE SET
                </Typography>
                <Divider sx={{mx: 'auto',mb:'15px', width: '50%',height: '3px'}}/>

                <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
                    <Button
                        variant="contained"
                        sx={buttonSuccessSx(0)}
                        disabled={loading[0]}
                        width={'100%'}
                        onClick={handleIpfsUpload}
                    >
                        UPLOAD SET DATA TO IPFS
                    </Button>
                    {loading[0] && (
                        <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                            <LinearProgress color='inherit' sx={{height: '5px'}}/>
                        </Box>
                    )}
                </Box>
                <Typography variant="body1" sx={{textAlign: 'center', mb: '20px', mt: '5px'}}>
                    {btnMsg[0]}
                </Typography>

                <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
                    <Button
                        variant="contained"
                        sx={buttonSuccessSx(1)}
                        disabled={!btnSuccess[0] || loading[1]}
                        onClick={cloneContract}
                    >
                        DEPLOY CONTRACT CLONE
                    </Button>
                    
                    {loading[1] && (
                        <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                            <LinearProgress color='inherit' sx={{height: '5px'}}/>
                        </Box>
                    )}
                </Box>

                <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                    {btnMsg[1]}
                </Typography>

                <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
                    <Button
                        variant="contained"
                        sx={buttonSuccessSx(2)}
                        disabled={!btnSuccess[1] || loading[2]}
                        onClick={initializeContract}
                    >
                        INITIALIZE CONTRACT
                    </Button>

                    {loading[2] && (
                        <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                            <LinearProgress color='inherit' sx={{height: '5px'}}/>
                        </Box>
                    )}
                </Box>

                <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                    {btnMsg[2]}
                </Typography>

                <Button
                    variant="contained"
                    disabled={!btnSuccess[2]}
                    onClick={() => setStage('createBadge')}
                >
                    SET UP BADGES
                </Button>
                <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                    {btnMsg[3]}
                </Typography>
            </Box>

            <Button onClick={logInfo} />

            <Box sx={{pt:'200px'}} />
        </div>
    )
}

export default SetCreator;