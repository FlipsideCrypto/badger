import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { providers } from 'ethers';
import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy'; // Do I fuckin need this fr
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './components/Pages/Home';
import CreateSetDash from "./components/Dashboards/CreateSetDash";
import NavBar from "./components/Blocks/NavBar";

import "./App.css";

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;

const { provider, chains } = configureChains(
  [chain.polygonMumbai, chain.polygon],
  [alchemyProvider({alchemyKey})]
)

const { connectors } = getDefaultWallets({
  chains
})

const wagmiClient = createClient({
  connectors,
  chains,
  provider
})

const theme = createTheme({
  palette: {
      mode: 'dark',
      primary: {
          main: '#FFFFFF'
      },
      secondary: {
          main: '#FFFFFF'
      },
  },
  typography: {
      fontFamily: 'Orbitron',
      color: '#FFFFFFF'
  },
});

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} theme={
          darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
          })}
        >
          <ThemeProvider theme={theme}>
            <Router>
              <NavBar />
            
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/create" element={<CreateSetDash />} />
              </Routes>
            </Router>

          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
