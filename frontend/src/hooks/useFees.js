import { useEffect, useState } from "react";
import { useFeeData } from "wagmi";
import { ethers } from "ethers";


// Gets the fees if a transaction is ready and multiplies them by a multiplier
// to help the transaction underpriced errors commonly being had on polygon.
export default function useFees() {
    const [fees, setFees] = useState(null);
    const { data } = useFeeData({
        watch: false,
        cacheTime: 5000,
    });

    useEffect(() => {
        if (data) {
            const multiplier = 1.1;
            const big_mul = ethers.BigNumber.from(Math.floor(multiplier * 100));
            let suggestedGas = {};
            suggestedGas.gasPrice = data.gasPrice.mul(big_mul).div(100);
            setFees(suggestedGas);
        }
    }, [data, setFees]);


    return fees;
}