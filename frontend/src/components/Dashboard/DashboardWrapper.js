import {
    ErrorContextProvider,
    OrgContextProvider,
    UserContextProvider
} from '@contexts';

import { ActionBar, Wallet } from '@components';

const DashboardWrapper = ({ children }) => {
    return (
        <ErrorContextProvider>
            <Wallet>
                <OrgContextProvider>
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