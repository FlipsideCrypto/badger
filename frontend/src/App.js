import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import Landing from '@components/Landing';

import "./App.css";
import Dashboard from '@components/Dashboard/Dashboard';
import WalletWrapper from "@components/Wallet/WalletWrapper";

library.add(fal)

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Helmet>
            <title>BADGER | The Web3 Organization Key Solution</title>
            <meta property="og:title" content="BADGER | The Web3 Organization Key Solution" />
            <meta name="twitter:title" content="BADGER | The Web3 Organization Key Solution" />

            <meta name="description" content="Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution." />
            <meta property="og:description" content="Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution." />
            <meta name="twitter:description" content="Level up the access-controls of your on-chain organization and enjoy the benefits of a Web3 focused key solution." />
          </Helmet>

          <WalletWrapper>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </WalletWrapper>

        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
