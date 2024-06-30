import { http, createConfig } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect, metaMask } from 'wagmi/connectors'

const MetaMaskOptions = {
  dappMetadat: {
    name: "SportsFusion",
  },
  infuraAPIKey:'1VQIDN8AWES2JEA2KSGDSD21DS52SD44B9',
}

export const config = createConfig({
  chains: [mainnet, sepolia, base, baseSepolia],
  connectors: [
    metaMask(),
    // coinbaseWallet({ appName: 'Create Wagmi' }),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
