import { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ethers } from "ethers";
import cloneAbi from "../../BadgerSet.json"

import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, LinearProgress, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"
import MiniPreview from "../Blocks/MiniPreview"

const BadgeCreator = (props) => {
    const { 
        badgeSetContract, 
        setStage, 
        signer, 
        address,
        badgeDataToFinalize, setBadgeDataToFinalize,
        setBadgeId
    } = props

    const [badgeName, setBadgeName] = useState('Badge Name');
    const [badgeDesc, setBadgeDesc] = useState('Description of the Badge.');
    const [badgeImgFile, setBadgeImgFile] = useState();
    const [badgeImgHash, setBadgeImgHash] = useState();
    const [currentBadgeIdx, setCurrentBadgeIdx] = useState(0)
    const [btnMsg, setButtonMsg] = useState([
        'Badger uploads your image to IPFS',
        'Save this Badge and start on another',
        "Send created Badges to the contract",
        'Move on to minting the new Badges to your community'
    ])

    const [btnSuccess, setBtnSuccess] = useState([false, false])
    const [loading, setLoading] = useState([false, false, false])

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
    }

    const selectImage = (event) => {
        setBadgeImgFile(event.target.files[0])
    }

    const handleNameChange = (event) => {
        setBadgeName(event.target.value)
    }

    const handleDescChange = (event) => {
        setBadgeDesc(event.target.value)
    }

    const uploadToIPFS = () => {
        console.log('Uploading')
        setLoading([true, false, false])

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };
        let formData = new FormData();
        formData.append('imgFile', badgeImgFile)
        formData.append('imgName', badgeImgFile.name)
        formData.append('contract_address', badgeSetContract)

        axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/pin_badge_image/`, formData, config)
        .then((res) => {
            console.log('Image pin response', res)
            setCurrentBadgeIdx(res.data.token_id)
            setBadgeImgHash(res.data.image_hash)
            setBtnSuccess([true, false, false])
            setLoading([false, false, false])
        })
        .catch((res) => {
            console.log('Error pinning image', res)
        })
    }

    const handleBadgeFinalize = () => {
        const data = [badgeName, badgeDesc, badgeImgHash]
        setBadgeDataToFinalize(badgeDataToFinalize => [...badgeDataToFinalize, data])
    }

    const handleNewBadgeForm = () => {
        setBadgeId((badgeId) => badgeId+1);
    }

    const setBadgesTransaction = () => {
        setLoading([false, false, true]);

        const contract = new ethers.Contract(
            badgeSetContract,
            cloneAbi,
            signer
        );
            
        let tokenIds = [];
        let formData = new FormData();
        formData.append('contract_address', badgeSetContract);
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        for(
            let i = 0; 
            i < badgeDataToFinalize.length; 
            i++
        ) {
            tokenIds.push(i + currentBadgeIdx);
            formData.append('tokenId', i + currentBadgeIdx)
            formData.append('name', badgeDataToFinalize[i][0])
            formData.append('desc', badgeDataToFinalize[i][1])
            formData.append('imageHash', badgeDataToFinalize[i][2])
        }

        console.log(tokenIds, badgeDataToFinalize)
        contract.createBadgeTypeBundle(
            tokenIds,
            badgeDataToFinalize
        )
        .then((transaction) => {
            console.log('Creating Badges..')

            transaction.wait()
            .then(() => {
                axios.post(`${process.env.REACT_APP_API_URL}/badge_sets/new_badges/`, formData, config)
                .then(() => {
                    setBtnSuccess([true, true, true])
                    setLoading([false, false, false])
                })
                .catch((error) => {
                    console.log('error with post', error)
                })
            })
        })
    }

    useEffect(() => {
        if (
            !badgeImgHash ||
            badgeDataToFinalize.length > 1 &&
            badgeImgHash === badgeDataToFinalize[badgeDataToFinalize.length - 1][2]
        ) return

        handleBadgeFinalize();
    }, [badgeImgHash])

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                NEW BADGES
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
                Badges are the individual tokens that can be sent to the members of your organization.
                The Badge is the role, award, or contribution that you want to represent on-chain. Before minting,
                each Badge Type has to be set in the contract.
            </Typography>

            <Grid container rowSpacing={1} columnSpacing={3} sx={{textAlign: 'left'}}>
                <Grid item xs={0} md={1} lg={2} />
                <Grid item xs={12} md={5} lg={4}>
                    <BigBox>
                        <FormControl sx={{width: '100%', margin:'auto', my:'20px', alignItems:'center'}}>
                            <TextField 
                                label="Badge Name"
                                onChange={handleNameChange}
                                sx={{width: '90%'}}
                                color='info'
                            />
                            
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Name for the Badge
                                </FormHelperText>
                            </Box>
                        </FormControl>
                        <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
                            <TextField 
                                multiline
                                rows={12}
                                label="Badge Description"
                                onChange={handleDescChange}
                                sx={{width: '90%'}}
                                color='info'
                            />
                            <Box sx={{textAlign: 'left', width: '90%'}}>
                                <FormHelperText>
                                    Description of the Badge
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
                                    color='info'
                                    onChange={selectImage}
                                />
                                <Button 
                                    sx={{width: '100%', margin:'auto', borderStyle: 'dashed'}}
                                    variant='outlined'
                                    onClick={() => fileInput.current.click()}
                                >
                                    <Typography variant="body1" sx={{alignSelf: 'baseline'}}>
                                        {badgeImgFile ? badgeImgFile.name : 'Upload Image'}
                                    </Typography>
                                </Button>
                                <FormHelperText>
                                    Image for the Badge token (1:1 Aspect Ratio Recommended)
                                </FormHelperText>
                            </label>
                        </FormControl>
                    </BigBox>
                </Grid>

                <Grid item xs={12} md={5} lg={4}>
                    <BigBox>
                        <CollectionCard
                            imageFile={badgeImgFile}
                            name={badgeName}
                            description={badgeDesc}
                        />
                    </BigBox>
                    <Grid item xs={0} md={1} lg={2} />
                </Grid>
            </Grid>

            {/* Control Buttons */}
            <Grid container columnSpacing={2}>

                <Grid item xs={1} md={3} lg={4}/>
                <Grid item xs={10} md={6} lg={4}>
                    <Box 
                        sx={{
                            display: 'flex', 
                            flexDirection:'column',
                            margin: 'auto',
                            mt: '100px',
                        }}
                    >
                        <Typography variant="h2" sx={{textAlign: 'center'}}>
                            FINALIZE BADGE
                        </Typography>
                        <Divider sx={{mx: 'auto',mb:'15px', width: '80%',height: '3px'}}/>

                        <Button
                            variant="contained"
                            sx={buttonSuccessSx(0)}
                            disabled={false}
                            onClick={() => uploadToIPFS()}
                        >
                            UPLOAD BADGE IMAGE
                        </Button>
                        {loading[0] && (
                            <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </Box>
                        )}
                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[0]}
                        </Typography>


                        <Grid container columnSpacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    sx={buttonSuccessSx(1)}
                                    disabled={!btnSuccess[0]}
                                    onClick={() => handleNewBadgeForm()}
                                >
                                    CREATE ANOTHER
                                </Button>
                                <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                                    {btnMsg[1]}
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    sx={buttonSuccessSx(2)}
                                    disabled={!btnSuccess[0]}
                                    onClick={() => setBadgesTransaction()}
                                >
                                    SEND TO CONTRACT
                                </Button>
                                <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                                    {btnMsg[2]}
                                </Typography>

                            </Grid>
                        </Grid>

                        <Button
                                variant="contained"
                                sx={buttonSuccessSx(3)}
                                disabled={!btnSuccess[2]}
                                onClick={() => setStage('mintBadges')}
                            >
                                START MINTING
                        </Button>
                        <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
                            {btnMsg[3]}
                        </Typography>

                    </Box>
                </Grid>
                <Grid item xs={1} md={3} lg={4} />
            </Grid>

            {badgeDataToFinalize.length > 0 &&
                <>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={1} md={3} lg={4}/>
                        <Grid item xs={10} md={6} lg={4}>
                            <Box 
                                sx={{
                                    display: 'flex', 
                                    flexDirection:'column',
                                    // width: '60%',
                                    margin: 'auto',
                                    mt: '100px',
                                }}
                            >
                                <Typography variant="h2" sx={{textAlign: 'center', mt: '50px'}}>
                                    QUEUED BADGES
                                </Typography>
                                <Divider sx={{mx: 'auto',mb:'15px', width: '80%',height: '3px'}}/>
                        
                            </Box>
                        </Grid>
                        <Grid item xs={1} md={3} lg={4}/>
                    </Grid>    
                </>
            }
        </div>
    )
}

export default BadgeCreator;