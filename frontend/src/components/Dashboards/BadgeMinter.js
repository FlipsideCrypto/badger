import { useEffect, useState, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ethers } from "ethers";
import proxyAbi from "../../Badger.json"
import cloneAbi from "../../BadgerSet.json"

import { Box, TextField, Typography, Button, Input, FormHelperText, Grid, Divider, CircularProgress, LinearProgress } from '@mui/material';
import { FormControl } from '@mui/material';

import CollectionCard from '../Blocks/CollectionCard'
import BigBox from "../Blocks/BigBox"

const BadgeCreator = (props) => {
    const { badgeSetContract, setStage, signer, address } = props

    return (
        <h3>{ badgeSetContract }</h3>
    )
}

export default BadgeCreator