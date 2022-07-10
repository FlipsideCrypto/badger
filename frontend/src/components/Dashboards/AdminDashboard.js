import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSigner, useAccount } from 'wagmi'
import { ethers } from "ethers";

import { Box, TextField, Typography, Button, Input, Tooltip } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../CollectionCard'

const AdminDashboard = () => {
    const { address, isConnecting, isDisconnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner();

    const [collectionName, setCollectionName] = useState();
    const [collectionDesc, setCollectionDesc] = useState();
    const [imageFile, setImageFile] = useState();

    // const csrfCookie = () => {
    //     let cookieValue = null,
    //         name = "csrftoken";
    //     if (document.cookie && document.cookie !== "") {
    //         let cookies = document.cookie.split(";");
    //         for (let i = 0; i < cookies.length; i++) {
    //             let cookie = cookies[i].trim();
    //             if (cookie.substring(0, name.length + 1) == (name + "=")) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // };

    const selectImage = (event) => {
        console.log('File: ', event.target.files[0])
        setImageFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setCollectionName(event.target.value)
    }

    const handleDescChange = (event) => {
        setCollectionDesc(event.target.value)
    }

    const deploy = () => {
        const formData = new FormData();
        // const csrf = csrfCookie();
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            //   'Authorization': `Token ${csrf}`
            },
        };
        // const imgUrl = URL.createObjectURL(imageFile)

        formData.append('file', imageFile)
        formData.append('fileName', imageFile.name)
        formData.append('name', collectionName)
        formData.append('desc', collectionDesc)
        formData.append('creator_address', address)
        
        let deploymentArgs;

        // formData.append(
        //     {'name': collectionName},
        //     {'image': imageFile},
        //     {'desc': collectionDesc},
        //     {'admin': address}
        // )


        axios.post(`${process.env.REACT_APP_API_URL}/badges/new_set/`, formData, config)
        .then(res => {
                console.log(res)
                deploymentArgs = {
                    baseuri: 'BASEURI', // should this be my pinata gateway
                    contract_uri_hash: res.data.contract_uri_hash,
                    description: res.data.description
                }

                console.log('deploymentArgs', deploymentArgs)
            }
        );
        
        // deploy
        // return link to OS collection


    }

    useEffect(() => {
        // get owned orgs of address

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
                            onClick={deploy}
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

export default AdminDashboard;