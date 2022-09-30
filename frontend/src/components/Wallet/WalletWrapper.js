import { configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const WalletWrapper = ({ children }) => {
    const { chains, provider } = configureChains(
        defaultChains,
        [
          alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
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