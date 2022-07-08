import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { providers } from 'ethers';
import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy'; // Do I fuckin need this fr
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';

import Landing from './components/Home/Landing';
import AdminDashboard from "./components/Dashboards/AdminDashboard";

import "./App.css"

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const { chains } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [alchemyProvider({alchemyKey})]
)

const { connectors } = getDefaultWallets({
  chains
})

const wagmiClient = createClient({
  connectors,
  chains,
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, alchemyKey)
  }
})

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Router>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
  );
}

export default App;
