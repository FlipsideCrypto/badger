import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import { Landing } from '@pages/Landing/Landing';

import { Dashboard, SEO, WalletWrapper } from "@components"

import "./App.css";

import WSTest from "./WSTest"; // TODO: Remove this shit

library.add(fal)

const title = "BADGER | The Web3 Organization Key Solution";
const description = "Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution."

function App() {
    return (
        <div className="App">
            <SEO title={title} description={description} />

            <Router>
                <WalletWrapper>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/dashboard/*" element={<Dashboard />} />
                        <Route exact path="ws/test" element={<WSTest />} />
                    </Routes>
                </WalletWrapper>
            </Router>
        </div>
    );
}

export default App;
