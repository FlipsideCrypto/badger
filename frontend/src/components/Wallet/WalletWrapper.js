import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, localhost } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const WalletWrapper = ({ children }) => {
    const { chains, provider } = configureChains(
        [polygon, localhost],
        [
          alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
          publicProvider()
        ]
      );
            
      const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        chains
      });
      
      const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider
      })

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                { children }
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default WalletWrapper;