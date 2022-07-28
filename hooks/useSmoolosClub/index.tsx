import { useWeb3 } from '@3rdweb/hooks';
import { SOMOOLOS_BET_CLUB_ADDRESS } from 'config';
import { Contract, ethers } from 'ethers';
import BettingClubContract from 'hardhat/artifacts/contracts/BettingClub.sol/BettingClub.json';
import { useContract } from 'hooks/useContract';
import { useToast } from 'hooks/useToast';
import { useEffect, useState } from 'react';

export const useSmoolosBetClub = () => {
  const { contract: smoolosClub } = useContract<Contract>({
    contractAddress: SOMOOLOS_BET_CLUB_ADDRESS,
    contractJson: BettingClubContract,
  });

  const { toastError, toastSuccess } = useToast();
  const { address: userAddress } = useWeb3();

  const [owner, setOnwer] = useState('');
  const [totalBucket, setTotalBucket] = useState(0);
  const [minBetAmount, setMinBetAmount] = useState(0);

  const bet = async ({
    amount,
    side,
    game,
  }: {
    amount: string;
    side: string;
    game: string;
  }) => {
    if (!smoolosClub || !userAddress) return;

    try {
      const options = { value: ethers.utils.parseEther(amount) };

      const bet = await smoolosClub.bet(side, game, options);

      toastSuccess({
        msg: `${parseFloat(amount)} BET successfully is side: ${side}`,
      });

      return bet;
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

  const setWinner = async ({ side, game }: { side: string; game: string }) => {
    if (!smoolosClub || !userAddress) return;

    try {
      const setWinner = await smoolosClub.setWinner(side, game);

      toastSuccess({
        msg: `side: ${side} WON`,
      });

      return setWinner;
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

  const toggleBet = async () => {
    if (!smoolosClub || !userAddress) return;

    try {
      const toggleBet = await smoolosClub.toggleBet();

      return toggleBet;
    } catch (error) {
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

  const getTotalBetsBySide = async ({
    side,
    game,
  }: {
    side: string;
    game: string;
  }) => {
    if (!smoolosClub || !userAddress) return;

    try {
      const totalBetsBySide = await smoolosClub.getTotalBetsBySide(side, game);

      // console.log(totalBetsBySide);

      return totalBetsBySide;
    } catch (error) {
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

  const getTotalBucket = async () => {
    if (!smoolosClub || !userAddress) return;

    try {
      const totalBucket = await smoolosClub.getBucket();

      setTotalBucket(parseFloat(ethers.utils.formatEther(totalBucket)));
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
    const handleGetBucket = async () => {
      await getTotalBucket();
    };

    handleGetBucket();
  }, [getTotalBucket]);

  const getMinBetAmount = async () => {
    if (!smoolosClub || !userAddress) return;

    try {
      const minBetAmount = await smoolosClub.minBetAmount();

      setMinBetAmount(parseFloat(ethers.utils.formatEther(minBetAmount)));
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
    const handleGetMinBetAmount = async () => {
      await getMinBetAmount();
    };

    handleGetMinBetAmount();
  }, [getMinBetAmount]);

  const getOwner = async () => {
    if (!smoolosClub || !userAddress) return;

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

  useEffect(() => {
    const handleGetOwners = async () => {
      await getOwner();
    };

    handleGetOwners();
  }, [getOwner]);

  return {
    owner,
    toggleBet,
    bet,
    setWinner,
    totalBucket,
    minBetAmount,
    getTotalBetsBySide,
  };
};
