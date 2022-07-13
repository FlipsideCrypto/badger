import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import { providers } from 'ethers';
import { createClient, WagmiConfig, chain, configureChains } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy'; // Do I fuckin need this fr
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Home from './components/Pages/Home';
import Footer from "./components/Blocks/Footer";
import NavBar from "./components/Blocks/NavBar";

import Landing from './components/Pages/Landing';
import SetCreator from "./components/Dashboards/SetCreator"
import BadgeCreator from "./components/Dashboards/BadgeCreator"
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
      mode: 'light',
      primary: {
          main: '#FFFFFF',
          contrastText: '#000000'
      },
      secondary: {
          main: '#FFFFFF',
          contrastText: '#000000'
      },
      info: {
        main: '#000000',
        light: '#000000',
        dark: '#000000',
        contrastText: '#000000'
      }
  },
  typography: {
      fontFamily: 'Poppins',
      body1: {
        color: '#00000065',
      },
      body2: {
        color: '#00000065',
      },
      button: {
        fontWeight: 900,
      },
      h1: {
        fontSize: 38,
        lineHeight: 1.5,
        fontWeight: 500
      },
      h2: {
        color: '#000000',
        fontSize: 34,
        lineHeight: 1.5,
        fontWeight: 500,
      },
      h3: {
        color: '#000000',
        fontWeight: 700,
      },
      h4: {
        color: '#000000',
      },
      h5: {
        color: '#000000',
      },
      h6: {
        color: '#00000085',
        fontSize: 20
      },
      h7: {
        color: '#000000',
        fontWeight: 600,
        fontSize: 18
      }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {variant: 'outlined'},
          style: {
            '&:hover': {
              border: '1px solid #000000'
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          '&:hover': {
            background: 'repeating-linear-gradient(-70deg, #FFFFFF 0 6px, #00000065 6px 7px);',
          },
          border: '1px solid #000000',
          width: '100%'
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: {variant: 'outlined', disabled: true},
          style: {
            backgroundColor: '#d1d1d1',
            opacity: '0.60',
            borderRadius: '5px'
          },
        },
      ],
    },
    MuiBox: {
      styleOverrides: {
        root: {
          border: '1px solid #000000'
        },
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains}>
          <ThemeProvider theme={theme}>
            <Router>
              <Helmet>
                <title>BADGER</title>
                <meta property="og:title" content="BADGER" />
                <meta name="twitter:title" content="BADGER" />
                
                <meta name="description" content="Badge-ify the roles that control the gates of your on-chain organization." />
                <meta property="og:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
                <meta name="twitter:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
              </Helmet>

              <NavBar />
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<SetCreator />} />
                <Route path="/create/badges" element={<BadgeCreator />} />
              </Routes>
              <Footer />
            </Router>
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
