import { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, TextField, Typography, Button, Input } from '@mui/material';
import { FormControl } from '@mui/material';



const AdminDashboard = () => {
    const [imageFile, setImageFile] = useState();

    const selectImage = (event) => {
        console.log('File: ', event.target.files[0])
        setImageFile(event.target.files[0])
    }

    const uploadImage = () => {


    }

    useEffect(() => {
        // get owned orgs of address

    }, [])

    return (
        <Box 
            sx={{
                bgcolor: "#FFFFFF10",
                width: '90%',
                height: 'auto',
                margin: 'auto',
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
                />
            </FormControl>
            <FormControl sx={{width:'80%',mx:'auto', mb:'20px'}}>
                <TextField 
                    multiline
                    rows={10}
                    InputProps={{style: {fontSize:'12px'}}}
                    label="Collection Description"
                    helperText="Description of the badge set."
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

            <Button 
                sx={{width: '30%', margin:'auto', mb:'30px'}}
                variant='contained'
            >
                Create Set
            </Button>
        </Box>
    )
}

export default AdminDashboard;