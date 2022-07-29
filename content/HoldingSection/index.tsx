import { ethers } from 'ethers';
import { useSmoolosBetClub } from 'hooks/useSmoolosClub';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import imageLiveon from '../../images/liveon.jpg';
import imageTempra from '../../images/tempra.gif';

interface IHoldingSection {
  totalBucket: number;
  game: string;
}

export const HoldingSection = ({ totalBucket, game }: IHoldingSection) => {
  const [totalBetsA, setTotalBetsA] = useState(0);
  const [totalBetsB, setTotalBetsB] = useState(0);
  const [totalAmountA, setTotalAmountA] = useState(0);
  const [totalAmountB, setTotalAmountB] = useState(0);

  const { getTotalBetsBySide } = useSmoolosBetClub();

  const handlegetTotalBetsBySide = async () => {
    const responseA = await getTotalBetsBySide({
      game,
      side: 'A',
    });

    const responseB = await getTotalBetsBySide({
      game,
      side: 'B',
    });

    if (responseA) {
      setTotalBetsA(parseFloat(responseA[0]));
      setTotalAmountA(parseFloat(ethers.utils.formatEther(responseA[1])));
    }

    if (responseB) {
      setTotalBetsB(parseFloat(responseB[0]));
      setTotalAmountB(parseFloat(ethers.utils.formatEther(responseB[1])));
    }
  };

  handlegetTotalBetsBySide();

  return (
    <div
      className="grid grid-cols-3 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
      style={{ minHeight: '400px' }}
    >
      <span className="text-center text-white">
        TOTAL BUCKET{' '}
        <span className="text-purple-500 display-4">{totalBucket} MATIC</span>
      </span>

      <span className="text-center text-white">
        <div className="mb-4">MANSAO</div>
        <div className="mb-4">
          <Image width="150px" height="100px" alt="mansao" src={imageTempra} />
        </div>

        <div className="mb-4">
          TOTAL BETS{' '}
          <span className="text-purple-500 display-4">{totalBetsA}</span>
        </div>
        <div>
          TOTAL BUCKET{' '}
          <span className="text-purple-500 display-4">
            {totalAmountA} MATIC
          </span>
        </div>
      </span>

      <span className="text-center text-white">
        <div className="mb-4">LIVEON</div>
        <div className="mb-4">
          <Image width="150px" height="100px" alt="liveon" src={imageLiveon} />
        </div>

        <div className="mb-4">
          TOTAL BETS{' '}
          <span className="text-purple-500 display-4">{totalBetsB}</span>
        </div>
        <div>
          TOTAL BUCKET{' '}
          <span className="text-purple-500 display-4">
            {totalAmountB} MATIC
          </span>
        </div>
      </span>
    </div>
  );
};
