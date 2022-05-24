import { AddEthereumChainParameter } from '@3rdweb/hooks';
import { CHAIN_ID, POLYGON_CHAIN_ID } from 'config';

// Chains & Icons -> https://github.com/ethereum-lists/chains/tree/master/_data

interface t {
  [key: number]: AddEthereumChainParameter;
}

export const addNetowrkMetadata: t = {
  [POLYGON_CHAIN_ID]: {
    chainId: `0x${CHAIN_ID.toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Polygon Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    iconUrls: [''],
  },
};

export const networkMetadata = {};
