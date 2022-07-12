import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSigner, useAccount, useNetwork } from 'wagmi'
import { ethers } from "ethers";
import proxyAbi from "../../Badger.json"

import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, Fab } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"

const SetCreator = () => {
    let navigate = useNavigate();

    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner();
    const { chain, chains } = useNetwork();
    
    // const proxyHandlerContractAddress = chain.name == 'polygon' ?
    //     process.env.REACT_APP_POLYGON_PROXY : 
    //     process.env.REACT_APP_MUMBAI_PROXY
    const proxyHandlerContractAddress = process.env.REACT_APP_MUMBAI_PROXY;

    const [collectionName, setCollectionName] = useState('Badger Badges');
    const [collectionDesc, setCollectionDesc] = useState('Your set description will appear at the top of your collection on popular marketplaces and other token viewing apps.');
    const [imageFile, setImageFile] = useState();
    const [filesUploaded, setFilesUploaded] = useState(false);
    const [deployedCloneAddress, setDeployedCloneAddress] = useState();

    const fileInput = useRef();

    const selectImage = (event) => {
        setImageFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setCollectionName(event.target.value)
    }

    const handleDescChange = (event) => {
        setCollectionDesc(event.target.value)
    }

    const initializeSet = () => {
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
                if(res.data['success']) {
                    deploymentArgs = {
                        baseuri: '',
                        contract_uri_hash: res.data.contract_uri_hash,
                        description: res.data.description
                    }
                    deployContract(deploymentArgs);
                }
                else {
                    console.log('Invalid Upload')
                }
            }
        );
    }

    const deployContract = (args) => {
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
                console.log('Clone Address2', res.events[0].args.setAddress)

                setDeployedCloneAddress(res.events[0].args.setAddress)
            })
            .catch((res) => {
                console.log('Error Cloning', res)
            })
        })

        console.log('Args', args)

        // proxyContract.initialize(
        //     args.baseuri,
        //     args.contract_uri_hash,
        //     args.description
        // ).then((transaction) => {
        //     console.log('Initializing Set...');
        //     transaction.wait()
        //     .then((res) => {
        //         console.log('Set Initialized.', res)
        //     })
        // })
    
        // Deploy
        // Await tx
        // When it's mined give a thumbs up, take to badge creation page
        // Also include a tx or link to OS or something
    }


    useEffect(() => {        
        if(!chain) {
            navigate('/')
        }

    }, [])

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
                <Typography variant="body1" sx={{textAlign: 'center'}}>
                    To finish the setup, click through the action buttons. You will first upload the collection data to IPFS,
                    then deploy a clone of the Badger contract (so your set will be its own collection). Then initialize that clone,
                    before moving on to set up your Badges.
                </Typography>
                <Divider sx={{mx: 'auto',mb:'15px', width: '50%',height: '3px'}}
                />
                <Fab variant="extended">
                    UPLOAD SET DATA TO IPFS
                </Fab>
                <Fab sx={{mt:'20px'}}variant="extended">
                    DEPLOY CONTRACT CLONE
                </Fab>
                <Fab sx={{mt:'20px'}}variant="extended">
                    INITIALIZE CONTRACT
                </Fab>
                <Fab sx={{mt:'20px'}}variant="extended">
                    SET UP BADGES
                </Fab>
            </Box>

            <Box sx={{pt:'200px'}} />
        </div>
    )
}

export default SetCreator;