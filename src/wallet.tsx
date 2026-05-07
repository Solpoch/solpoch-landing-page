import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import App from './App';

export const Wallet = () => {
  const network = WalletAdapterNetwork.Devnet;
  // this will work as well but it is better to use alchemy or quicknode for reliability as it can be slow sometimes
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = 'https://solana-devnet.g.alchemy.com/v2/ZvO1xrbvSrS4A3BHl4W1C'; // api key is exposed here for demo purposes only ;)

  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};