import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

// import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
// import { alchemyProvider } from 'wagmi/providers/alchemy';

// import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';

import Landing from './components/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import "./App.css";

library.add(fal)

// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

// const { provider, chains } = configureChains(
//   [chain.polygonMumbai, chain.polygon],
//   [alchemyProvider({ alchemyKey })]
// )

// const { connectors } = getDefaultWallets({
//   chains
// })

// const wagmiClient = createClient({
//   connectors,
//   chains,
//   provider
// })

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

          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="dashboard/" element={<Dashboard />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
