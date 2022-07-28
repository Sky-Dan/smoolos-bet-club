import { useWeb3 } from '@3rdweb/hooks';
import { SOMOOLOS_NFT_ADDRESS } from 'config';
import { Contract } from 'ethers';
import SmoolosNFTContract from 'hardhat/artifacts/contracts/NFTCollection.sol/NFTCollection.json';
import { useContract } from 'hooks/useContract';
import { useToast } from 'hooks/useToast';
import { useCallback, useEffect, useState } from 'react';

export const useSmoolosNFT = () => {
  const { contract: smoolosNFT } = useContract<Contract>({
    contractAddress: SOMOOLOS_NFT_ADDRESS,
    contractJson: SmoolosNFTContract,
  });

  const { toastError } = useToast();

  const { address: userAddress } = useWeb3();

  const [totalSupply, setTotalSupply] = useState(0);
  const [baseURI, setBaseURI] = useState('');
  const [maxSupply, setMaxSupply] = useState(0);

  const getTotalSupply = async () => {
    if (!smoolosNFT || !userAddress) return;

    try {
      const totalSupply = await smoolosNFT.totalSupply();

      if (totalSupply) {
        setTotalSupply(totalSupply.toNumber());
      }
    } catch (error: any) {
      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
      }
    }
  };

  const getBalanceOf = async (address: string) => {
    if (!smoolosNFT || !userAddress) return;

    try {
      const balanceOf = await smoolosNFT.balanceOf(address);

      if (balanceOf) {
        return balanceOf.toNumber();
      }
    } catch (error: any) {
      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
      }
    }
  };

  const getOwnerOf = async (id: number) => {
    if (!smoolosNFT || !userAddress) return;

    try {
      const ownerOf = await smoolosNFT.ownerOf(id);

      return ownerOf;
    } catch (error: any) {
      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
      }
    }
  };

  const getBaseURI = async () => {
    if (!smoolosNFT || !userAddress) return;

    try {
      const baseURI = await smoolosNFT.baseURI();

      setBaseURI(baseURI);
    } catch (error: any) {
      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
      }
    }
  };

  // const getMaxSupply = async () => {
  //   if (!smoolosNFT || !userAddress) return;

  //   try {
  //     const maxSupply = await smoolosNFT.maxSupply();

  //     if (maxSupply) {
  //       console.log(maxSupply);

  //       // setMaxSupply(maxSupply);
  //     }
  //   } catch (error: any) {
  //     console.log(error);

  //     if (error?.data) {
  //       toastError({ msg: error.data.message });
  //     } else if (error.error?.data) {
  //       toastError({ msg: error.error.data.message });
  //     } else {
  //       toastError({ msg: error.message });
  //     }
  //   }
  // };

  useEffect(() => {
    const handleGetTotalSupply = async () => {
      await getTotalSupply();
    };

    handleGetTotalSupply();
  }, [getTotalSupply]);

  const handleGetBaseURI = useCallback(async () => {
    await getBaseURI();
  }, [getBaseURI]);

  useEffect(() => {
    handleGetBaseURI();
  }, [handleGetBaseURI]);

  // useEffect(() => {
  //   const handleGetMaxSupply = async () => {
  //     await getMaxSupply();
  //   };

  //   handleGetMaxSupply();
  // }, [getMaxSupply]);

  return {
    getBalanceOf,
    getOwnerOf,
    totalSupply,
    baseURI,
    maxSupply,
  };
};
