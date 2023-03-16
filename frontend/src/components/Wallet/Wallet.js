import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { polygon, localhost } from 'wagmi/chains';

import { AuthenticationContextProvider, OrgContextProvider, UserContextProvider } from '@contexts';

const Wallet = ({ children }) => {
    const { chains, provider } = configureChains(
        [polygon, localhost],
        [
            alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
            publicProvider()
        ]
    );

    const { connectors } = getDefaultWallets({
        appName: 'Badger',
        chains
    });

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider
    })

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} modalSize="compact" theme={
                lightTheme({
                    accentColor: '#00FFE0',
                    accentColorForeground: 'white',
                    overlayBlur: 'small',
                    borderRadius: 'small',
                    fontStack: 'rounded'
                })}
            >
                <AuthenticationContextProvider>
                    <OrgContextProvider>
                        <UserContextProvider>
                            {children}
                        </UserContextProvider>
                    </OrgContextProvider>
                </AuthenticationContextProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export { Wallet };