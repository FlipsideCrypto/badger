import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import Meta from '@components/seo/Meta';

import Landing from '@components/Landing';

import Dashboard from '@components/Dashboard/Dashboard';
import WalletWrapper from "@components/Wallet/WalletWrapper";

import "./App.css";

library.add(fal)

function App() {
    const title = "BADGER | The Web3 Organization Key Solution";
    const description = "Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution."

    return (
        <div className="App">
            <Meta title={title} description={description} />

            <Router>
                <WalletWrapper>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
                </WalletWrapper>
            </Router>
        </div>
    );
}

export default App;
