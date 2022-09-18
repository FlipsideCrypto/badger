import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';

import Footer from "./_components/Blocks/Footer";
import Navbar from "./_components/Blocks/Navbar";

import Landing from './components/Landing';

import "./App.css";

library.add(fal)

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const { provider, chains } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [alchemyProvider({ alchemyKey })]
)

const { connectors } = getDefaultWallets({
  chains
})

const wagmiClient = createClient({
  connectors,
  chains,
  provider
})

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider coolMode chains={chains}>
            <Router>
              <Helmet>
                <title>BADGER</title>
                <meta property="og:title" content="BADGER" />
                <meta name="twitter:title" content="BADGER" />

                <meta name="description" content="Badge-ify the roles that control the gates of your on-chain organization." />
                <meta property="og:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
                <meta name="twitter:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
              </Helmet>

              {/* <Navbar /> */}
              <Routes>
                <Route exact path="/" element={<Landing />} />
              </Routes>
              {/* <Footer /> */}
            </Router>
          </RainbowKitProvider>
        </WagmiConfig>
      </HelmetProvider>
    </div>
  );
}

export default App;
