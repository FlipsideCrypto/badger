import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider, Typography, TextField, FormControl, Select, InputLabel, Button, Grid, MenuItem } from '@mui/material'
import ethers from 'ethers';

import CustomStepper from '../Blocks/CustomStepper';
import MiniPreview from '../Blocks/MiniPreview';
import BigBox from '../Blocks/BigBox';

const MintForm = (props) => {
    // const {
    //     signer,
    //     badgeData,
    //     badgeSetData,
    //     contractAddress,
    //     setStage,
    // } = props
    const { setStage } = props;

    var badgeData = [{'name': 'Badge 1'}, {'name': 'Badge 2'}]

    const [fieldData, setFieldData] = useState([{'address': null, 'badge': {'name': null, 'index': null}, 'error': null}]);
    const [mintSuccess, setMintSuccess] = useState(null);

    let navigate = useNavigate();

    const handleAddressChange = (idx, event) => {
        let fields = [...fieldData]
        fields[idx].address = event.target.value
        setFieldData(fields)

        console.log('FieldData', fieldData)
    }

    const handleBadgeChange = (idx, event) => {
        let fields = [...fieldData]
        // This way of finding badge index is messy, need to find a better way to handle it.
        const badgeIdx = badgeData.findIndex((badge) => badge.name === event.target.value)
        fields[idx].badge = {'name': event.target.value, 'index': badgeIdx}
    }

    const removeField = (idx) => {
        let fields = [...fieldData]
        fields.splice(idx, 1)
        setFieldData(fields)
    }

    const addField = () => {
        const newField = [{'address': null, 'badge': {'name': null, 'index': null}, 'error': null}]
        setFieldData([...fieldData, newField])
    }

    const handleMint = () => {

    }

    const handleBack = () => {
        setStage('finalizeSet')
    }

    const handleHome = () => {

    }

    function buttonSuccessSx() {
        if (mintSuccess === false) 
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
            {/* <MiniPreview badgeData={badgeData} /> */}

            <Typography variant="h1" sx={{pt: '20px', textAlign: 'center'}}>
                MINT BADGES
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
                The last step of creating your Badge Set is to distribute the Badges.
                Simply fill out the addresses of your community members, select the Badge
                to mint to the address, and run the transaction.
            </Typography>

            <BigBox>
                <div
                    style={{
                        marginRight: '10%',
                        marginLeft: '10%',
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
                                // gap: 16,
                            }}
                        >
                            <FormControl sx={{width: '100%'}}>
                                <TextField
                                    label="Address"
                                    onChange={(event) => handleAddressChange(idx, event)}
                                    color='info'
                                    sx={{width: '100%'}}
                                />
                            </FormControl>
                            <FormControl sx={{display: 'inline', width: '100%'}}>
                                <InputLabel id="badge-label">Badge</InputLabel>
                                <Select 
                                    labelid="badge-label"
                                    onChange={(event) => handleBadgeChange(idx, event)}
                                    sx={{width: '100%'}}
                                    label="Badge"
                                    color='info'
                                >
                                    {badgeData.map((badge) => (
                                        <MenuItem key={`${badge.name}`} value={badge.name} />
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    ))}

                    <div style={{width: '50%', margin: 'auto', marginTop: '20px'}}>
                        <Button
                            variant="contained"
                            disabled={false}
                            onClick={() => handleMint()}
                            sx={buttonSuccessSx()}
                        >
                            MINT
                        </Button>
                    </div>
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
                    {!fieldData[0].badge.name ?
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