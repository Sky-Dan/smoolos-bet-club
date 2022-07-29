import { ethers } from 'ethers';
import { useSmoolosBetClub } from 'hooks/useSmoolosClub';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { middleStringTruncate } from 'utils/middleStringTruncate';

import imageTempra from '../../images/tempra.jpg';

interface IHoldingSection {
  game: string;
}

export const BetsSection = ({ game }: IHoldingSection) => {
  const { getBets } = useSmoolosBetClub();

  const [bets, setBets] = useState<any>([]);

  const handleBets = useCallback(async () => {
    const bets = await getBets();

    setBets(bets);
  }, [getBets]);

  handleBets();

  // console.log(bets);

  return (
    <div
      className="grid grid-cols-1 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
      style={{ height: `${bets?.length * 100}px` }}
    >
      {bets?.map((bet: any) => {
        if (bet[2] === game) {
          return (
            <div
              className="text-white "
              // style={{ width: '100%' }}
              key={bet[0]}
            >
              <span>ACCOUNT: {middleStringTruncate(bet[0], 6, 6)}</span>
              {' | '}
              <span>SIDE: {bet[1] === 'A' ? 'mansao' : 'antiNFTS'}</span>
              {' | '}
              <span>AMOUNT: {ethers.utils.formatEther(bet[3] || 0)}</span>
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </div>
  );
};
