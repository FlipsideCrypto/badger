import { useContext } from 'react';

import { createSearchParams, useNavigate } from 'react-router-dom';

import { OrgContext } from '@contexts';

const useNavigateAddress = () => {
    const navigate = useNavigate();

    const { address, viewing } = useContext(OrgContext)

    const search = address && viewing ? { search: `?${createSearchParams({ address })}` } : {};

    return (pathname) =>
        navigate({
            pathname, ...search
        });
};

export { useNavigateAddress };