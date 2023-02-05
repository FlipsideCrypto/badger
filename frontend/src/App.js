import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { ErrorContextProvider } from "@contexts"

import { SEO, Wallet } from "@components"

import { Dashboard, Page } from "@pages"

import "@style/App.css"

library.add(fal, fab)

const title = "BADGER | The Web3 Organization Key Solution";
const description = "Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution."

function App() {
    return (
        <div className="App">
            <SEO title={title} description={description} />

            <Router>
                <Routes>
                    <Route exact path="/dashboard/*" element={
                        <ErrorContextProvider>
                            <Wallet>
                                <Dashboard />
                            </Wallet>
                        </ErrorContextProvider>
                    } />

                    <Route path="/*" element={<Page />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
