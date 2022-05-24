import { SOMOOLOS_NFT_ADDRESS } from 'config';
import { Contract } from 'ethers';
import SmoolosNFTContract from 'hardhat/artifacts/contracts/NFTCollection.sol/NFTCollection.json';
import { useContract } from 'hooks/useContract';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useSmoolosNFT = () => {
  const { contract: smoolosNFT } = useContract<Contract>({
    contractAddress: SOMOOLOS_NFT_ADDRESS,
    contractJson: SmoolosNFTContract,
  });

  const [totalSupply, setTotalSupply] = useState(0);
  const [baseURI, setBaseURI] = useState('');
  const [maxSupply, setMaxSupply] = useState(0);

  const getTotalSupply = async () => {
    if (!smoolosNFT) return;

    try {
      const totalSupply = await smoolosNFT.totalSupply();

      setTotalSupply(totalSupply.toNumber());
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getBalanceOf = async (address: string) => {
    if (!smoolosNFT) return;

    try {
      const balanceOf = await smoolosNFT.balanceOf(address);

      return balanceOf.toNumber();
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getOwnerOf = async (id: number) => {
    if (!smoolosNFT) return;

    try {
      const ownerOf = await smoolosNFT.ownerOf(id);

      return ownerOf;
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getBaseURI = async () => {
    if (!smoolosNFT) return;

    try {
      const baseURI = await smoolosNFT.baseURI();

      setBaseURI(baseURI);
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getMaxSupply = async () => {
    if (!smoolosNFT) return;

    try {
      const maxSupply = await smoolosNFT.maxSupply();

      setMaxSupply(maxSupply.toNumber());
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

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

  useEffect(() => {
    const handleGetMaxSupply = async () => {
      await getMaxSupply();
    };

    handleGetMaxSupply();
  }, [getMaxSupply]);

  return {
    getBalanceOf,
    getOwnerOf,
    totalSupply,
    baseURI,
    maxSupply,
  };
};
