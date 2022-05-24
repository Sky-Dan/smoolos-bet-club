import { SOMOOLOS_CLUB_ADDRESS } from 'config';
import { Contract, ethers } from 'ethers';
import SmoolosClubContract from 'hardhat/artifacts/contracts/SmoolosClub.sol/SmoolosClub.json';
import { useContract } from 'hooks/useContract';
import { useToast } from 'hooks/useToast';
import { useEffect, useState } from 'react';

export const useSmoolosClub = () => {
  const { contract: smoolosClub } = useContract<Contract>({
    contractAddress: SOMOOLOS_CLUB_ADDRESS,
    contractJson: SmoolosClubContract,
  });

  const { toastError } = useToast();

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
      console.log(error.data);

      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
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

      if (error?.data) {
        toastError({ msg: error.data.message });
      } else if (error.error?.data) {
        toastError({ msg: error.error.data.message });
      } else {
        toastError({ msg: error.message });
      }
    }
  };

  const getOwner = async () => {
    if (!smoolosClub) return;

    try {
      const owner = await smoolosClub.owner();

      setOnwer(owner);
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

  const getBalance = async () => {
    if (!smoolosClub) return;

    try {
      const balance = await smoolosClub.getBalance();

      setBalance(ethers.utils.formatEther(balance));
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

  const getMyBalance = async (address: string) => {
    if (!smoolosClub) return;

    try {
      const myBalance = await smoolosClub.balances(address);

      return ethers.utils.formatEther(myBalance);
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

  const getTotalHolders = async () => {
    if (!smoolosClub) return;

    try {
      const totalHolders = await smoolosClub.getTotalAccounts();

      setTotalHolders(totalHolders.toNumber());
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
    getMyBalance,
    deposit,
    withdraw,
    totalHolders,
    balance,
    owner,
  };
};
