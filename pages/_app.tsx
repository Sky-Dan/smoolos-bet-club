import 'styles/globals.css';
import { ThirdwebWeb3Provider, useWeb3 } from '@3rdweb/hooks';
import { CHAIN_ID } from 'config';
import { PageLayout } from 'layouts/PageLayout';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { addNetowrkMetadata } from 'utils/constants';
import { useCallback, useEffect, useState } from 'react';
import { useSmoolosNFT } from 'hooks/useSmoolosNFT';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Include what chains you wanna support.
const supportedChainIds = [CHAIN_ID];

// Include what type of wallet you want to support.
// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {},
};

const check = () => {
  const [ownerOfNFT, setOwnerOfNFT] = useState(false);

  const { address } = useWeb3();

  const { getBalanceOf } = useSmoolosNFT();

  const handleGetBalanceOf = useCallback(async () => {
    const balanceOf = await getBalanceOf(address || '');

    setOwnerOfNFT(balanceOf > 0);
  }, [address]);

  useEffect(() => {
    handleGetBalanceOf();
  }, [handleGetBalanceOf]);

  console.log(ownerOfNFT);

  return <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
        chainAddConfig={addNetowrkMetadata}
      >
        <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThirdwebWeb3Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
