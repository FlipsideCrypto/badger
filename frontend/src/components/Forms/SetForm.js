import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"
import CustomStepper from "../Blocks/CustomStepper"

const SetForm = (props) => {
    let navigate = useNavigate();

    const { badgeSetData, setBadgeSetData, setStage } = props;

    const [collectionName, setCollectionName] = useState(badgeSetData.name);
    const [collectionDesc, setCollectionDesc] = useState(badgeSetData.description);
    const [imageFile, setImageFile] = useState(badgeSetData.imgFile);

    const defaultName = 'Badger Badges'
    const defaultDesc = 'Your Set description will appear at the top of your collection on popular marketplaces and other token viewing apps.'

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

    const handleNext = () => {
        const setData = {
            'name': collectionName,
            'description': collectionDesc,
            'imgFile': imageFile
        }
        
        setBadgeSetData(setData)
        setStage('createBadge')
        // window.scrollTo(0, 0);
    }

    const handleBack = () => {
        navigate('/home')
        // window.scrollTo(0,0);
    }

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={0} />
            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                CREATE SET
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
                Badge Sets are collections of Badges that can represent anything within your community. 
                Badges are contained within a Set, like awards have categories, and roles are in an organization. 
                A Set will be it's own contract while Badges are tokens within that contract.
            </Typography>

            <Grid container rowSpacing={{sm:4, md:4, lg:5}} columnSpacing={{sm:0, md:3, lg:5}} sx={{textAlign: 'left'}}>
                <Grid item sm={0} md={1} lg={2} />
                <Grid item sm={12} md={5} lg={4}>
                    <BigBox>
                        <FormControl sx={{width: '100%', margin:'auto', my:'20px', alignItems:'center'}}>
                            <TextField 
                                label="Collection Name"
                                onChange={handleNameChange}
                                sx={{width: '90%'}}
                                color='info'
                                defaultValue={collectionName}
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
                                rows={10}
                                label="Collection Description"
                                onChange={handleDescChange}
                                sx={{width: '90%'}}
                                color='info'
                                defaultValue={collectionDesc}
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

                <Grid item sm={12} md={5} lg={4}>
                    <BigBox>
                        <CollectionCard
                            name={collectionName !== null ? collectionName : defaultName}
                            description={collectionDesc !== null ? collectionDesc : defaultDesc}
                            imageFile={imageFile}
                        />
                    </BigBox>
                </Grid>
                <Grid item sm={0} md={1} lg={2} />

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
                    {!collectionName || !collectionDesc || !imageFile ?
                        <Button
                            variant="contained"
                            disabled={true}
                            onClick={() => handleNext()}
                        >
                            NEXT
                        </Button>
                        :
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleNext()}
                        >
                            NEXT
                        </Button>
                    }
                </Grid>
                <Grid item sm={0} md={1} lg={2} />
            </Grid>

            <Box sx={{pt:'100px'}} />
        </div>
    )
}

export default SetForm;