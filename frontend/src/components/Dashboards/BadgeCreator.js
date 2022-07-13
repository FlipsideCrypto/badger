import { useEffect, useState, useRef, Suspense } from 'react';
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

const BadgeCreator = (props) => {
    const { badgeSetContract, setStage } = props

    return (
        <h3>{ badgeSetContract }</h3>
    )


    // return (
    //     <div style={{marginLeft: '50px', marginRight: '50px'}}>
    //         <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
    //             NEW SET
    //         </Typography>
    //         <Divider 
    //             sx={{
    //                 mx: 'auto',
    //                 mb:'15px', 
    //                 width: '50%',
    //                 height: '3px'
    //             }}
    //         />

    //         <Typography variant="body1" sx={{mb:'30px', mx:'20%', textAlign: 'center'}}>
    //             Badge Sets are individual token collections that can represent anything within your community. 
    //             Badges are contained within a Set, like awards have categories and roles are in an organization. 
    //             A Set will be it's own contract while Badges are tokens within that contract.
    //         </Typography>

    //         <Grid container rowSpacing={1} columnSpacing={2} sx={{textAlign: 'left'}}>
    //             <Grid item xs={6}>
    //                 <BigBox>
    //                     <FormControl sx={{width: '100%', margin:'auto', my:'20px', alignItems:'center'}}>
    //                         <TextField 
    //                             label="Collection Name"
    //                             onChange={handleNameChange}
    //                             sx={{width: '90%'}}
    //                         />
                            
    //                         <Box sx={{textAlign: 'left', width: '90%'}}>
    //                             <FormHelperText>
    //                                 Name for the Badge Set
    //                             </FormHelperText>
    //                         </Box>
    //                     </FormControl>
    //                     <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
    //                         <TextField 
    //                             multiline
    //                             rows={12}
    //                             label="Collection Description"
    //                             onChange={handleDescChange}
    //                             sx={{width: '90%'}}
    //                         />
    //                         <Box sx={{textAlign: 'left', width: '90%'}}>
    //                             <FormHelperText>
    //                                 Description of the Badge Set
    //                             </FormHelperText>
    //                         </Box>
    //                     </FormControl>

    //                     <FormControl sx={{width: '100%', margin:'auto', mb:'20px', alignItems:'center'}}>
    //                         <label htmlFor="contained-button-file" style={{width: '90%'}}>
    //                             <Input 
    //                                 sx={{display: 'none'}} 
    //                                 ref={fileInput}
    //                                 accept="image/*" 
    //                                 id="contained-button-file" 
    //                                 multiple type="file" 
    //                                 onChange={selectImage}
    //                             />
    //                             <Button 
    //                                 sx={{width: '100%', margin:'auto', borderStyle: 'dashed'}}
    //                                 variant='outlined'
    //                                 onClick={() => fileInput.current.click()}
    //                             >
    //                                 <Typography variant="body1" sx={{alignSelf: 'baseline'}}>
    //                                     {imageFile ? imageFile.name : 'Upload Image'}
    //                                 </Typography>
    //                             </Button>
    //                             <FormHelperText>
    //                                 Image for the Badge Set contract collection
    //                             </FormHelperText>
    //                         </label>
    //                     </FormControl>
    //                 </BigBox>
    //             </Grid>

    //             <Grid item xs={6}>
    //                 <BigBox>
    //                     <CollectionCard
    //                         imageFile={imageFile}
    //                         name={collectionName}
    //                         description={collectionDesc}
    //                     />
    //                 </BigBox>
    //             </Grid>
    //         </Grid>

    //         <Box 
    //             sx={{
    //                 display: 'flex', 
    //                 flexDirection:'column',
    //                 width: '60%',
    //                 margin: 'auto',
    //                 mt: '50px'
    //             }}
    //         >
    //             <Typography variant="h2" sx={{textAlign: 'center'}}>
    //                 FINALIZE THE SET
    //             </Typography>
    //             <Divider sx={{mx: 'auto',mb:'15px', width: '50%',height: '3px'}}/>

    //             <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
    //                 <Button
    //                     variant="contained"
    //                     sx={buttonSuccessSx(0)}
    //                     disabled={loading[0]}
    //                     width={'100%'}
    //                     onClick={handleIpfsUpload}
    //                 >
    //                     UPLOAD SET DATA TO IPFS
    //                 </Button>
    //                 {loading[0] && (
    //                     <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
    //                         <LinearProgress color='inherit' sx={{height: '5px'}}/>
    //                     </Box>
    //                 )}
    //             </Box>
    //             <Typography variant="body1" sx={{textAlign: 'center', mb: '20px', mt: '5px'}}>
    //                 {btnMsg[0]}
    //             </Typography>

    //             <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
    //                 <Button
    //                     variant="contained"
    //                     sx={buttonSuccessSx(1)}
    //                     disabled={!btnSuccess[0] || loading[1]}
    //                     onClick={cloneContract}
    //                 >
    //                     DEPLOY CONTRACT CLONE
    //                 </Button>
                    
    //                 {loading[1] && (
    //                     <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
    //                         <LinearProgress color='inherit' sx={{height: '5px'}}/>
    //                     </Box>
    //                 )}
    //             </Box>

    //             <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
    //                 {btnMsg[1]}
    //             </Typography>

    //             <Box sx={{position: 'relative', margin: 'auto', width: '100%'}}>
    //                 <Button
    //                     variant="contained"
    //                     sx={buttonSuccessSx(2)}
    //                     disabled={!btnSuccess[1] || loading[2]}
    //                     onClick={initializeContract}
    //                 >
    //                     INITIALIZE CONTRACT
    //                 </Button>

    //                 {loading[2] && (
    //                     <Box sx={{width: '100%', height:'100%', color:'#A8FBB3'}}>
    //                         <LinearProgress color='inherit' sx={{height: '5px'}}/>
    //                     </Box>
    //                 )}
    //             </Box>

    //             <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
    //                 {btnMsg[2]}
    //             </Typography>

    //             <Button
    //                 variant="contained"
    //                 disabled={!btnSuccess[2]}
    //                 onClick={() => navigate('/create/badges')}
    //             >
    //                 SET UP BADGES
    //             </Button>
    //             <Typography variant="body1" sx={{textAlign: 'center', mb:'20px', mt: '5px'}}>
    //                 {btnMsg[3]}
    //             </Typography>
    //         </Box>

    //         <Box sx={{pt:'200px'}} />
    //     </div>
    // )
}

export default BadgeCreator;