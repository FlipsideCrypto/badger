import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSigner, useAccount } from "wagmi"

const Home = () => {
    let navigate = useNavigate();

    // useEffect(() => {        
    //     if(!address) {
    //         navigate('/')
    //     }
    // }, [])

    return (
        <>
            <h3>Home</h3>
        </>
    )
}

export default Home;