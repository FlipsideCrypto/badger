import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers } from 'ethers';
import cloneAbi from "../../BadgerSet.json"

import { Divider, Typography, TextField, FormControl, LinearProgress, Button, Grid, MenuItem } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

import CustomStepper from '../Blocks/CustomStepper';
import MiniPreview from '../Blocks/MiniPreview';
import BigBox from '../Blocks/BigBox';

const MintForm = (props) => {
    const {
        signer,
        badgeData,
        badgeSetData,
        contractAddress,
        setStage,
    } = props

    const [fieldData, setFieldData] = useState([{'address': '', 'badge': {'name': '', 'index': null, 'error': null}, 'error': null}]);
    const [mintSuccess, setMintSuccess] = useState(null);
    const [mintLoading, setMintLoading] = useState(false);
    const [mintError, setMintError] = useState();

    let navigate = useNavigate();

    const handleAddressChange = (idx, event) => {
        let fields = [...fieldData]
        fields[idx].address = event.target.value
        
        // Clear errors if they're changing an error field
        if (fields[idx].error) {
            fields[idx].error = null
            setMintError(null)
        }
        setFieldData(fields)
    }

    const handleBadgeChange = (idx, event) => {
        let fields = [...fieldData]
        // This way of finding badge index is messy, need to find a better way to handle it.
        const badgeIdx = badgeData.findIndex((badge) => badge.name === event.target.value)
        fields[idx].badge = {'name': event.target.value, 'index': badgeIdx, 'error': null}

        // Clear errors if they're changing an error field
        if (fields[idx].badge.error) {
            setMintError(null)
        }

        setFieldData(fields)
    }

    const removeField = (idx) => {
        let fields = [...fieldData]
        if (fields.length == 1) {
            const newField = {'address': '', 'badge': {'name': '', 'index': null, 'error': null}, 'error': null}
            fields[0] = newField
        } 
        else {
            fields.splice(idx, 1)
        }
        setFieldData(fields)
    }

    const addField = () => {
        const newField = {'address': '', 'badge': {'name': '', 'index': null, 'error': null}, 'error': null}
        setFieldData([...fieldData, newField])
    }

    const validateData = () => {
        let addresses = []
        let badgeIds = []
        let validationError;
        let fields = [...fieldData]
        console.log('fields', fields)
        fields.forEach((field, idx) => {
            if (!ethers.utils.isAddress(field.address)) {
                fields[idx].error = 'Invalid!'
                validationError = `Invalid address in row ${idx + 1}.`
            }

            if (field.badge.index === null) {
                validationError = `Badge not found in row ${idx + 1}.`
                fields[idx].badge.error = 'Invalid!'
            }

            addresses.push(field.address)
            badgeIds.push(field.badge.index)
        })

        if (validationError) setFieldData(fields)
        return [validationError, addresses, badgeIds]
    }

    const handleMint = () => {
        setMintLoading(true)
        setMintError(null)
        const [validationError, addresses, badgeIds] = validateData();        

        if (validationError) {
            setMintError(validationError)
            setMintLoading(false)
            setMintSuccess(false)
            return
        }

        const connectedContract = new ethers.Contract(
            contractAddress,
            cloneAbi,
            signer
        )

        connectedContract.mintBadgeBundle(
            addresses,
            badgeIds
        )
        .then((transaction) => {
            transaction.wait()
            .then((res) => {

            })
        })
        .catch((res) => {
            setMintLoading(false);
            setMintError(res)
        })
    }

    const handleBack = () => {
        setStage('finalizeSet')
    }

    const handleHome = () => {
        navigate('/home')
    }

    function buttonSuccessSx() {
        if (mintError) 
            return {
                ...({
                    bgcolor: '#FBA8A8',
                })
            }


        if (mintSuccess === true) 
            return {
                ...({
                    bgcolor: '#A8FBB3',
                    pointerEvents: 'none',
                    opacity: '0.60'
                }),
            }
    }

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={3} />

            <div style={{marginTop: '50px'}} />
            <MiniPreview badgeData={badgeData} />

            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                MINT BADGES
            </Typography>
            <Divider 
                sx={{
                    mx: 'auto',
                    mb: '15px', 
                    width: '50%',
                    height: '3px'
                }}
            />

            <Typography variant="body1" sx={{mb:'30px', mx:'20%', textAlign: 'center'}}>
                The last step of creating your Badge Set is to distribute the Badges.
                Simply fill out the addresses of your community members, select the Badge
                to mint to the address, and run the transaction.
            </Typography>

            <BigBox>
                <div
                    style={{
                        marginRight: '5%',
                        marginLeft: '5%',
                        paddingTop: '20px',
                        paddingBottom: '20px'
                    }}
                >
                    {fieldData.map((field, idx) => (
                        <div 
                            key={`${idx}`}
                            style={{
                                display: 'flex', 
                                flexDirection: 'row', 
                                gap: 12,
                            }}
                        >
                            <FormControl sx={{width: '100%'}}>
                                <TextField
                                    label={field.error || "Address"}
                                    onChange={(event) => handleAddressChange(idx, event)}
                                    color='info'
                                    error={field.error !== null}
                                    value={field.address || ''}
                                    sx={{width: '100%'}}
                                    InputProps={{ style: {fontSize: 14}}}
                                    InputLabelProps={{ style: {fontSize: 14}}}
                                />
                            </FormControl>
                            <FormControl sx={{display: 'inline', width: '60%', mb: '8px'}}>
                                <TextField 
                                    label="Badge"
                                    select
                                    onChange={(event) => handleBadgeChange(idx, event)}
                                    color='info'
                                    value={field.badge.name || ''}
                                    error={field.badge.error !== null}
                                    sx={{width: '100%'}}
                                    InputProps={{ style: {fontSize: 14}}}
                                    InputLabelProps={{ style: {fontSize: 14}}}
                                >
                                    {badgeData.map((badge) => (
                                        <MenuItem key={`${badge.name}`} value={badge.name}>{badge.name}</MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>

                            <div 
                                onClick={(field) => removeField(idx)} 
                                style={{cursor: 'pointer', display: 'inline-flex', alignItems: 'center', marginBottom:'8px'}}
                            >
                                <RemoveCircleOutlineOutlinedIcon />
                            </div>    
                        </div>
                    ))}

                    <div style={{display: 'flex', justifyItems: 'center', width: '100%', marginTop:'10px', marginBottom: '20px'}}>
                        <div onClick={addField} style={{cursor: 'pointer', margin: 'auto'}}>
                            <AddCircleOutlineOutlinedIcon />
                        </div>
                    </div>

                    <div style={{width: '30%', margin: 'auto'}}>
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleMint()}
                            sx={buttonSuccessSx()}
                        >
                            MINT
                        </Button>
                        {mintLoading && (
                            <div style={{width: '100%', height:'100%', color:'#A8FBB3'}}>
                                <LinearProgress color='inherit' sx={{height: '5px'}}/>
                            </div>
                        )}
                    </div>
                    {mintError ?
                        <Typography variant="body1" sx={{pt: '10px', textAlign: 'center', color: '#FBA8A8'}}>
                            {mintError}
                        </Typography>
                        :
                        <Typography variant="body1" sx={{pt: '10px', textAlign: 'center', visibility: 'hidden'}}>
                            Maintain the padding
                        </Typography>
                    }
                </div>
            </BigBox>

            <Grid container rowSpacing={{sm:4, md:4, lg:5}} columnSpacing={{sm:0, md:3, lg:5}}>
                <Grid item sm={12} /> {/* For consistent row spacing */}
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
                    {!mintSuccess ?
                        <Button
                            variant="contained"
                            disabled={true}
                        >
                            HOME
                        </Button>
                        :
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleHome()}
                        >
                            HOME
                        </Button>
                    }
                </Grid>
                <Grid item sm={0} md={1} lg={2} />
            </Grid>
        </div>
    )
}

export default MintForm;