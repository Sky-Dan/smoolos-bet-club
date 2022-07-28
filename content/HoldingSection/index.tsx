import { ethers } from 'ethers';
import { useSmoolosBetClub } from 'hooks/useSmoolosClub';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import imageTempra from '../../images/tempra.jpg';

interface IHoldingSection {
  totalBucket: number;
  game: string;
}

export const HoldingSection = ({ totalBucket, game }: IHoldingSection) => {
  const [totalBetsA, setTotalBetsA] = useState(0);
  const [totalBetsB, setTotalBetsB] = useState(0);
  const [totalAmountA, setTotalAmountA] = useState(0);
  const [totalAmountb, setTotalAmountB] = useState(0);
  const { getTotalBetsBySide } = useSmoolosBetClub();

  const handlegetTotalBetsBySide = async (side: string) => {
    const response = await getTotalBetsBySide({
      game,
      side: side,
    });

    // console.log(response);

    if (response && response.length > 0) {
      console.log(response);

      setTotalBetsA(response[0].toNumber());

      console.log(response);
    }

    // console.log(response);

    // console.log(
    //   parseFloat(ethers.utils.formatEther(totalAmount)),
    //   parseFloat(ethers.utils.formatEther(totalWinners))
    // );

    // setTotalA(parseFloat(ethers.utils.formatEther(res[0])) || 0);
  };

  useEffect(() => {
    handlegetTotalBetsBySide('A');
  }, []);

  // const handleTotal = async () => {
  //   const [totalAmountA, totalWinnersA] = getTotalBetsBySideA({
  //     game,
  //     side,
  //   });

  //   const [totalAmountB, totalWinnersB] = getTotalBetsBySideB({
  //     game,
  //     side,
  //   });

  //   console.log(parseFloat(ethers.utils.formatEther(totalAmountA)));

  //   return {
  //     totalAmountA: parseFloat(ethers.utils.formatEther(totalAmountA)),
  //     totalWinnersA: parseFloat(ethers.utils.formatEther(totalWinnersA)),
  //   };
  // };

  // const {  } = await handleTotal();

  return (
    <div
      className="grid grid-cols-3 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
      style={{ height: '300px' }}
    >
      <span className="text-center text-white">
        TOTAL BUCKET{' '}
        <span className="text-purple-500 display-4">{totalBucket} MATIC</span>
      </span>

      <span className="text-center text-white">
        <div className="mb-4">MANSAO</div>
        <div className="mb-4">
          TOTAL BETS{' '}
          <span className="text-purple-500 display-4">{totalAmountA}</span>
        </div>
        <div>
          TOTAL BUCKET{' '}
          <span className="text-purple-500 display-4">
            {totalAmountA} MATIC
          </span>
        </div>
      </span>

      <span className="text-center text-white">
        <div className="mb-4">MODAL</div>

        <div className="mb-4">
          TOTAL BETS{' '}
          <span className="text-purple-500 display-4">{totalAmountA}</span>
        </div>
        <div>
          TOTAL BUCKET{' '}
          <span className="text-purple-500 display-4">
            {totalAmountA} MATIC
          </span>
        </div>
      </span>
    </div>
  );
};
