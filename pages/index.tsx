import { useWeb3 } from '@3rdweb/hooks';
import axios from 'axios';
import { ContractCard } from 'components/ContractCard';
import { HoldingSection } from 'content/HoldingSection';
import { ToolsSection } from 'content/ToolsSection';
import { BetsSection } from 'content/BetsSection';

import { useSmoolosBetClub } from 'hooks/useSmoolosClub';
import { useSmoolosNFT } from 'hooks/useSmoolosNFT';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { BsArrowUpRight, BsRecordCircle } from 'react-icons/bs';

const styles = {
  transform: 'scale(1)',
  transition: 'transform 0.6s ease-in-out border 0.3s ease-in-out',
  border: '1px solid #525252',
};

const Home: NextPage = () => {
  const { totalBucket, getBets } = useSmoolosBetClub();
  const { getBalanceOf, getOwnerOf, totalSupply, baseURI } = useSmoolosNFT();

  const { address } = useWeb3();

  const configGames = [{ name: 'lol-2', label: 'LOL Game 2' }];

  const [balanceOf, setBalanceOf] = useState('0');
  const [nfts, setNfts] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>(configGames);

  const handleNfts = useCallback(async () => {
    if (address) {
      setNfts([]);
      for (let i = 1; i < totalSupply; i++) {
        const owner = await getOwnerOf(i);

        if (address === owner) {
          const nftSettings = `https://gateway.pinata.cloud/${String(
            baseURI
          ).replace('://', '/')}${i}`;

          const nft = await axios.get(nftSettings);

          setNfts((oldArray) => [
            ...oldArray,
            {
              image: nft.data.image,
              edition: nft.data.edition,
            },
          ]);
        }
      }
    }
  }, [address, totalSupply]);

  useEffect(() => {
    handleNfts();
  }, [handleNfts]);

  const handleGetBalanceOf = useCallback(async () => {
    const balanceOf = await getBalanceOf(address || '');

    setBalanceOf(balanceOf);
  }, [address]);

  useEffect(() => {
    handleGetBalanceOf();
  }, [handleGetBalanceOf]);

  return (
    <>
      <Head>
        <title>Smoolos Bet Club</title>
      </Head>
      <hr className="border-neutral-600/50" />
      <div className="flex flex-col gap-16">
        <div className="relative grid h-full grid-cols-2 gap-10 p-4 pt-40 pb-32 my-auto overflow-hidden border-b xl:px-8 xs:grid-cols-1 border-neutral-600/50">
          <div className="z-10 flex flex-col gap-8">
            <div className="flex items-center gap-2 px-4 rounded-full bg-neutral-200 max-w-max">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-semibold">Live on Polygon</span>
            </div>
            <h1 className="flex flex-col gap-4 font-semibold text-7xl sm:text-6xl xs:text-6xl">
              <span className="text-white">Start</span>
              <div>
                <span className="text-white">use</span>
                <span className="text-purple-500"> Smoolos</span>
              </div>
              <div>
                <span className="text-purple-500">Bet Club</span>
                <span className="text-white"> Dapp</span>
              </div>
            </h1>
            <p className="text-gray-300">Explore the crypto world.</p>
            <a
              href="https://smoolos.netlify.app"
              target="_blank"
              className="flex items-center gap-2 p-2 px-4 transition-all bg-purple-500 rounded-md max-w-max hover:scale-105"
              rel="noreferrer"
            >
              <span className="font-semibold">{'MINT NOW'}</span>
              <BsArrowUpRight className="" />
            </a>
          </div>
          <div className="z-10 flex flex-col items-center gap-2">
            <ContractCard
              styles={styles}
              totalBalance={0}
              game={games[0].name}
              labelGame={games[0].label}
            />
          </div>
          <div className="absolute bottom-0 w-[100%] h-[25rem]">
            <Image
              src="/images/PerspectiveGrid.svg"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 bg-gradient-to-l from-purple-600/10 to-neutral-900/10 w-[50%] h-full"></div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <hr className="w-40 border-neutral-600/50" />
          <BsRecordCircle className="text-white" />
          <hr className="w-40 border-neutral-600/50" />
        </div>

        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-center text-white">
            Smoolos Bet Club Details
          </h2>

          {games.map((game) => {
            return (
              <HoldingSection
                key={game.name}
                totalBucket={totalBucket}
                game={game.name}
                labelGame={game.label}
                // getTotalBetsBySideA={getTotalBetsBySide}
                // getTotalBetsBySideB={getTotalBetsBySide}
              />
            );
          })}
        </section>

        <div className="flex items-center justify-center gap-6">
          <hr className="w-40 border-neutral-600/50" />
          <BsRecordCircle className="text-white" />
          <hr className="w-40 border-neutral-600/50" />
        </div>

        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-center text-white">
            {'Current Bets'}
          </h2>
          <BetsSection game={configGames[0].name} />{' '}
        </section>

        <div className="flex items-center justify-center gap-6">
          <hr className="w-40 border-neutral-600/50" />
          <BsRecordCircle className="text-white" />
          <hr className="w-40 border-neutral-600/50" />
        </div>

        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-center text-white">
            {"Your NFT's"}
          </h2>
          <ToolsSection nfts={nfts} />
        </section>
      </div>
    </>
  );
};

export default Home;
