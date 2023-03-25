import {
    OrgContextProvider,
    UserContextProvider,
    ErrorContextProvider
} from '@contexts';

import { Wallet, ActionBar } from '@components';

const DashboardWrapper = ({ children, paramAddress }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');

    const focusedAddress = paramAddress !== undefined ? paramAddress : address;

    return (
        <ErrorContextProvider>
            <Wallet>
                <OrgContextProvider paramAddress={focusedAddress}>
                    <UserContextProvider>
                        <ActionBar />

                        {children}
                    </UserContextProvider>
                </OrgContextProvider >
            </Wallet>
        </ErrorContextProvider >
    )
}

export { DashboardWrapper }