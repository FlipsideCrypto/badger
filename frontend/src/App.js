import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import { SEO, WalletWrapper } from "@components"

import { Dashboard, Landing } from "@pages"

import "@style/App.css"

library.add(fal)

const title = "BADGER | The Web3 Organization Key Solution";
const description = "Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution."

function App() {
    return (
        <div className="App">
            <SEO title={title} description={description} />

            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/dashboard/*" element={
                        <WalletWrapper>
                            <Dashboard />
                        </WalletWrapper>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
