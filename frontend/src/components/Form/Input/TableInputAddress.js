import { sliceAddress } from '@utils';

const TableInputAddress = ({ value, onChange, ...props }) => {
    const isMobile = window.innerWidth <= 768;

    return (
        <input
            className="table__input mono"
            value={isMobile ? sliceAddress(value) : value}
            placeholder="Ethereum address or ENS..."
            onChange={onChange}
            {...props}
        />
    );
};

export { TableInputAddress };
