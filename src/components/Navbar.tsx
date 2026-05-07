import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useState } from 'react';
import { api } from '../lib/axios';
import { API_ROUTES } from '../lib/api';

export default function Navbar() {

  const { publicKey, signMessage } = useWallet();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [verifying, setVerifying] = useState(false);

  const onClick = useCallback(async () => {
    try {
      if (!publicKey) throw new Error('Wallet not connected!');
      if (!signMessage) throw new Error('Wallet does not support message signing!');
      setVerifying(true);
      const message = new TextEncoder().encode('Sign in to The DAPP Thing');
      const signature = await signMessage(message);
      const payload = {
        publicKey: publicKey.toBase58(),
        signature: Array.from(signature),
        message: Array.from(message),
      };
      const res = await api.post(API_ROUTES.user.login, payload);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
      } else {
        alert('Authentication failed!');
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setVerifying(false);
    }
  }, [publicKey, signMessage]);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 bg-black/40 backdrop-blur-md border-b border-white/6'>
      <div className='flex items-center gap-2.5'>
        {/* <div className='w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.6)]' /> */}
        <span className='text-white text-sm font-semibold tracking-tight'>wallet<span className='text-purple-400'>.test</span></span>
        <span className='ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/10'>devnet</span>
      </div>
      <div className='flex gap-2 items-center'>
        {token && (
          <span className='text-[10px] font-mono text-green-400 px-2 py-1 rounded bg-green-500/10 border border-green-500/20'>● authenticated</span>
        )}
        {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
        {publicKey && !token && (
          <button
            onClick={onClick}
            disabled={verifying}
            className='px-4 py-1.5 text-xs font-mono rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-colors disabled:opacity-50'
          >
            {verifying ? 'signing…' : 'verify'}
          </button>
        )}
      </div>
    </nav>
  );
}