import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import {
    ErrorContextProvider,
    OrgContextProvider,
    UserContextProvider
} from '@contexts';

import { ActionBar, SEO, ScrollToTop, Wallet } from "@components"

import { Dashboard, Discover, Page } from "@pages"

import "@style/App.css"

library.add(fal, fab)

const title = "The Web3 Organization Key Solution | Badger";
const description = "Level up the access-controls of your onchain organization and enjoy the benefits of a Web3 focused key solution."

const DashboardUserWrapper = ({ children }) => {
    return (
        <>
            <OrgContextProvider>
                <UserContextProvider>
                    <ActionBar />
                    {children}
                </UserContextProvider>
            </OrgContextProvider >
        </>
    )
}

const DashboardWrapper = ({ children }) => {
    return (
        <ErrorContextProvider>
            <Wallet>
                <DashboardUserWrapper>
                    {children}
                </DashboardUserWrapper>
            </Wallet>
        </ErrorContextProvider >
    )
}

function App() {
    return (
        <div className="App">
            <SEO title={title} description={description} />

            <Router>
                <ScrollToTop />

                <Routes>
                    <Route exact path="/discover/" element={
                        <DashboardWrapper>
                            <Discover />
                        </DashboardWrapper>
                    } />

                    <Route exact path="/dashboard/*" element={
                        <DashboardWrapper>
                            <Dashboard />
                        </DashboardWrapper>
                    } />

                    <Route path="/*" element={<Page />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
