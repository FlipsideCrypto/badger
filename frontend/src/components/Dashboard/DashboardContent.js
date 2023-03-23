import {
    OrgContextProvider,
    UserContextProvider,
    WindowContextProvider
} from '@contexts';

import { ActionBar, DashboardWindow } from '@components';

const DashboardContent = ({ children }) => {
    return (
        <WindowContextProvider>
            <OrgContextProvider>
                <UserContextProvider>
                    <ActionBar />

                    <DashboardWindow>
                        {children}
                    </DashboardWindow>

                </UserContextProvider>
            </OrgContextProvider>
        </WindowContextProvider>
    )
}

export { DashboardContent };