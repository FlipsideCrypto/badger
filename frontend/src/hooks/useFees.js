import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useFeeData } from "wagmi";

function useFees() {
    const [fees, setFees] = useState(null);
    const { data } = useFeeData({
        watch: false,
        cacheTime: 5000,
    });

    useEffect(() => {
        if (data) {
            const multiplier = 1.25;
            const big_mul = ethers.BigNumber.from(Math.floor(multiplier * 100));
            let suggestedGas = {};
            suggestedGas.gasPrice = data.gasPrice.mul(big_mul).div(100);
            setFees(suggestedGas);
        }
    }, [data, setFees]);


    return fees;
}

export { useFees }