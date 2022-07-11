import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSigner, useAccount, useNetwork, useContract, useContractWrite } from 'wagmi'
import { ethers } from "ethers";
import proxyAbi from "../../Badger.json"

import { Box, TextField, Typography, Button, Input, Tooltip } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'

const CreateSetDash = (props) => {
    let navigate = useNavigate();

    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner();
    const { chain, chains } = useNetwork();
    
    // const proxyHandlerContractAddress = chain.name == 'polygon' ?
    //     process.env.REACT_APP_POLYGON_PROXY : 
    //     process.env.REACT_APP_MUMBAI_PROXY
    const proxyHandlerContractAddress = process.env.REACT_APP_MUMBAI_PROXY;

    const [collectionName, setCollectionName] = useState();
    const [collectionDesc, setCollectionDesc] = useState();
    const [imageFile, setImageFile] = useState();
    const [filesUploaded, setFilesUploaded] = useState(false);
    const [deployedCloneAddress, setDeployedCloneAddress] = useState();

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
        console.log(proxyHandlerContractAddress, proxyAbi, signer)

        // const { data, isError, isLoading, writeTx } = useContractWrite({
        //     addressOrName: proxyHandlerContractAddress,
        //     contractInterface: proxyAbi,
        //     chainId: chain.id,
        //     functionName: 'deploySet',
        //     args: [],
        //     onSettled(data, error) {
        //         console.log('Settled', { data, error })
        //     },
        //   })

        //   console.log('GETS HERE')
        //   writeTx()

        const proxyContract = new ethers.Contract(
            proxyHandlerContractAddress,
            proxyAbi,
            signer
        );

        // proxyContract.deploySet({gasLimit: 100000})
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
       
       
       
       // EXAMPLE: 
        // const handleTransactionCall = (contractFunction, actionIndex, SUCCESS_MESSAGE) => { 
        //     contractFunction.then((transaction) => {
        //         setChainMessage(insertedMessage(0, SUCCESS_TRANSACTION));
        //         handleTransactionResponse(transaction, actionIndex, SUCCESS_MESSAGE);
        //     })
        //     .catch(res => { 
        //         setChainMessage(insertedMessage(actionIndex, '[ERROR] ' + res['message'])) 
        //     })
        // }
    
        // Deploy
        // Await tx
        // When it's mined give a thumbs up, take to badge creation page
        // Also include a tx or link to OS or something
    }


    useEffect(() => {        
        if(!chain) {
            console.log('Going back home')
            navigate('/')
        }

    }, [])

    return (
        <>
            <Box 
                sx={{
                    bgcolor: "#FFFFFF10",
                    width: '90%',
                    height: 'auto',
                    mx: 'auto',
                    mb: '30px'
                }}
            >
                <Typography variant="h4" sx={{pt: '20px', mb:'10px'}}>
                    NEW BADGE SET
                </Typography>

                <Typography variant="body2" sx={{pt: '20px', mb:'30px'}}>
                    Badge Sets are individual token collections that can represent whatever you 
                    want them to represent. Badges are contained within their Set with bound by whatever 
                    criteria you want to compose them with. A Set can be an entire organization, or a small
                    subsection while Badges can represent the different roles within it.

                </Typography>

                <FormControl sx={{width: '80%', margin:'auto', mb:'20px'}}>
                    <TextField 
                        label="Collection Name"
                        helperText="Name for the badge set."
                        onChange={handleNameChange}
                    />
                </FormControl>
                <FormControl sx={{width:'80%',mx:'auto', mb:'20px'}}>
                    <TextField 
                        multiline
                        rows={10}
                        InputProps={{style: {fontSize:'12px'}}}
                        label="Collection Description"
                        helperText="Description of the badge set."
                        onChange={handleDescChange}
                    />
                </FormControl>

                <label htmlFor="contained-button-file">
                    <Input 
                        sx={{display: 'none'}} 
                        accept="image/*" 
                        id="contained-button-file" 
                        multiple type="file" 
                        onChange={selectImage}
                    />
                    <Button 
                        sx={{width: '80%', margin:'auto', mb:'20px', borderStyle: 'dashed'}}
                        variant='outlined'
                        component="span"
                    >
                        {imageFile ? imageFile.name : 'UPLOAD SET IMAGE'}
                    </Button>
                </label>
            </Box>

            {imageFile && collectionName && collectionDesc ?
                <Box sx={{
                    bgcolor: "#FFFFFF10",
                    width: '90%',
                    height: 'auto',
                    mx: 'auto',
                    py: '20px',
                    my: '20px'
                 }}>
                    <CollectionCard
                        imageFile={imageFile}
                        name={collectionName}
                        description={collectionDesc}
                    />

                    <Tooltip
                        disableFocusListener
                        placement="bottom"
                        title="This will initiate a transaction to deploy the contract for your Badge set."
                    >
                        <Button 
                            sx={{width: '30%', margin:'auto', my:'20px'}}
                            variant='contained'
                            onClick={initializeSet}
                        >
                            Create Set
                        </Button>
                    </Tooltip>
                </Box>
                :
                    <Box />
            }
        </>
        
    )
}

export default CreateSetDash;