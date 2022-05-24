import { SOMOOLOS_CLUB_ADDRESS } from 'config';
import { Contract, ethers } from 'ethers';
import SmoolosClubContract from 'hardhat/artifacts/contracts/SmoolosClub.sol/SmoolosClub.json';
import { useContract } from 'hooks/useContract';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const useSmoolosClub = () => {
  const { contract: smoolosClub } = useContract<Contract>({
    contractAddress: SOMOOLOS_CLUB_ADDRESS,
    contractJson: SmoolosClubContract,
  });

  const [totalHolders, setTotalHolders] = useState('0');
  const [balance, setBalance] = useState('0');
  const [owner, setOnwer] = useState('');

  const deposit = async (amount: string) => {
    if (!smoolosClub) return;

    try {
      const deposit = await smoolosClub.deposit({
        value: ethers.utils.parseEther(amount),
      });
      return deposit;
    } catch (error: any) {
      console.log(error);

      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const withdraw = async () => {
    if (!smoolosClub) return;

    try {
      const withdraw = await smoolosClub.withdraw();
      return withdraw;
    } catch (error: any) {
      console.log(error);

      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getOwner = async () => {
    if (!smoolosClub) return;

    try {
      const owner = await smoolosClub.owner();

      setOnwer(owner);
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getBalance = async () => {
    if (!smoolosClub) return;

    try {
      const balance = await smoolosClub.getBalance();

      setBalance(ethers.utils.formatEther(balance));
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const getTotalHolders = async () => {
    if (!smoolosClub) return;

    try {
      const totalHolders = await smoolosClub.getTotalAccounts();

      setTotalHolders(totalHolders.toNumber());
    } catch (error: any) {
      if (error.error?.data) {
        toast.error(error.error.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const handleGetBalance = async () => {
      await getBalance();
    };

    handleGetBalance();
  }, [getBalance]);

  useEffect(() => {
    const handleGetTotalHolders = async () => {
      await getTotalHolders();
    };

    handleGetTotalHolders();
  }, [getTotalHolders]);

  useEffect(() => {
    const handleGetOwners = async () => {
      await getOwner();
    };

    handleGetOwners();
  }, [getOwner]);

  return {
    deposit,
    withdraw,
    totalHolders,
    balance,
    owner,
  };
};
