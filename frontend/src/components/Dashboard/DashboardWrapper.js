import {
    ErrorContextProvider,
    OrgContextProvider,
    UserContextProvider
} from '@contexts';

import { ActionBar, Wallet } from '@components';

const DashboardWrapper = ({ children }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');

    return (
        <ErrorContextProvider>
            <Wallet>
                <OrgContextProvider paramAddress={address}>
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