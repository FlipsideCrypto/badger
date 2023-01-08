import { useEffect } from 'react';

import { configureChains, createClient, WagmiConfig, defaultChains, chain } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';

const WalletWrapper = ({ children }) => {
  const { chains, provider } = configureChains(
    [...defaultChains, chain.polygon, chain.localhost],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
      publicProvider()
    ]
  );

  const config = {
    appName: 'Badger',
    chains
  }

  const { connectors: defaultConnectors } = getDefaultWallets(config);

  const connectors = [
    ...defaultConnectors(),
    new SafeConnector(config)
  ];

  const wagmiClient = createClient({
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default WalletWrapper;