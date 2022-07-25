import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider, Typography } from '@mui/material'
import ethers from 'ethers';

import CustomStepper from '../Blocks/CustomStepper';

const MintForm = (props) => {
    const {
        signer,
        badgeData,
        badgeSetData,
        contractAddress,
    } = props

    let navigate = useNavigate();

    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <CustomStepper activeStep={3} />

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
        </div>
    )
}

export default MintForm;