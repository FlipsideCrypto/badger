import { ethers } from 'ethers';

import { Input } from '@components';

import { sliceAddress } from '@utils';

const InputAddress = ({ label, required, value, setValue, isValid, setIsValid, ...props }) => {
    const isMobile = window.innerWidth <= 768;

    const onAddressChange = (event) => {
        const address = event.target.value.trim();
        setValue(address);

        // An empty address is valid as it is caught in the contract hooks.
        if (address === '') {
            setIsValid(true);
            return;
        }
        // Save an RPC call if the address is not correct length.
        if (address.length !== 42) {
            setIsValid(false);
            return;
        }

        const valid = ethers.utils.isAddress(address);
        setIsValid(valid);
    };

    return (
        <Input
            label={label}
            className={isValid ? '' : 'error'}
            required={required}
            placeholder="0x0000..."
            value={isMobile ? sliceAddress(value) : value}
            onChange={(event) => onAddressChange(event)}
            {...props}
        />
    );
};

export { InputAddress };
