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

    console.log(response);
  };

  useEffect(() => {
    handlegetTotalBetsBySide('A');
  }, []);

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
