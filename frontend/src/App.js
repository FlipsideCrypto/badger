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
            <title>BADGER</title>
            <meta property="og:title" content="BADGER" />
            <meta name="twitter:title" content="BADGER" />

            <meta name="description" content="Badge-ify the roles that control the gates of your on-chain organization." />
            <meta property="og:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
            <meta name="twitter:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
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
