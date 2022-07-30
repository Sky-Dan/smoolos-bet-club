import { useWeb3 } from '@3rdweb/hooks';
import { SOMOOLOS_BET_CLUB_ADDRESS } from 'config';
import { ethers } from 'ethers';
import { useSmoolosBetClub } from 'hooks/useSmoolosClub';
import Image from 'next/image';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiMinusSquare, FiPlusSquare } from 'react-icons/fi';

interface IContractCardProps {
  totalBalance: any;
  game: string;
  labelGame: string;
  styles?: any;
  ref?: any;
}

export const ContractCard = forwardRef<HTMLDivElement, IContractCardProps>(
  ({ totalBalance, styles, game: currentGame, labelGame }, ref) => {
    const [betAmount, setBetAmount] = useState('1');
    const [loading, setLoading] = useState(false);
    const [sideWinner, setSideWinner] = useState('');
    const [side, setSide] = useState('A');
    const [oddA, setOddA] = useState(0);
    const [oddB, setOddB] = useState(0);

    // console.log(side);

    const [game, setGame] = useState('');

    // const [withdrawAmount, setWithdrawAmount] = useState(0);

    const { address } = useWeb3();

    const { owner, bet, setWinner, toggleBet, getOdd } = useSmoolosBetClub();

    const handleDepositAmount = (event: any) => {
      setBetAmount(event.target.value);
    };

    const handleSide = (event: any) => {
      setSide(event.target.value);
    };

    const handleBet = async () => {
      await bet({ amount: betAmount, game: currentGame, side: side });
    };

    const handleSetSideWinner = async () => {
      await setWinner({ game: currentGame, side: sideWinner });
    };

    const handleToggleBet = async () => {
      await toggleBet();
    };

    const handleOddA = async (side: string) => {
      const odd = await getOdd({ side, game: currentGame });

      setOddA(parseFloat(ethers.utils.formatEther(odd || 0)));
    };

    const handleOddB = async (side: string) => {
      const odd = await getOdd({ side, game: currentGame });

      setOddB(parseFloat(ethers.utils.formatEther(odd || 0)));
    };

    useEffect(() => {
      handleOddA('A');
      handleOddB('B');
    }, [handleOddA, handleOddB]);

    // const handleWithdraw = (event: any) => {
    //   setWithdrawAmount(event.target.value);
    // };

    const handleButtonStyle = useCallback(
      (sideChecked: string) => {
        return {
          padding: '4px',
          borderRadius: '5px',
          border: `${side === sideChecked ? '1px solid #A855F7' : 'none'}`,
        };
      },
      [side]
    );

    return (
      <div
        ref={ref}
        style={styles}
        className="flex flex-col max-w-md gap-6 p-5 mx-auto tracking-wide bg-black border rounded-md shadow-2xl xs:rotate-0 -rotate-2 border-neutral-600 font-audiowide"
      >
        <div className="flex flex-wrap justify-between">
          {/* <CopyToClipboard
            text={SOMOOLOS_BET_CLUB_ADDRESS || ''}
            onCopy={() => toast.success('smoolosClub contract copied')}
          >
            <button className="transition-all border-b border-transparent hover:border-white">
              <span className="text-white ">CONTRACT</span>
            </button>
          </CopyToClipboard> */}
          <span className="text-white ">CURRENT GAME - {labelGame}</span>

          <span className="text-white"></span>
        </div>
        <div>
          <label className="block mb-2 text-xs font-bold text-neutral-600">
            Bet
          </label>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5 xs:col-span-5 flex justify-between">
              <div className="col-span-5 flex">
                <span
                  className="text-white mr-2"
                  style={handleButtonStyle('A')}
                >
                  {`mansao | odd ${oddA}`}
                </span>
                <input
                  className="col-span-5 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
                  type="checkbox"
                  onChange={handleSide}
                  value="A"
                  defaultChecked
                />
              </div>

              <div className="col-span-5 flex">
                <span
                  className="text-white mr-2"
                  style={handleButtonStyle('B')}
                >
                  {`liveon | odd ${oddB}`}
                </span>
                <input
                  className="col-span-5 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
                  type="checkbox"
                  onChange={handleSide}
                  value="B"
                />
              </div>
            </div>

            <input
              className="col-span-2 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
              type="number"
              placeholder="0"
              onChange={handleDepositAmount}
              defaultValue="1"
              min="1"
            />
            <button
              className="flex items-center justify-center col-span-3 gap-2 p-2 px-4 transition-all bg-purple-500 rounded-md hover:scale-105"
              onClick={handleBet}
            >
              <span className="font-semibold">Bet MATIC</span>
              {loading && (
                <AiOutlineLoading3Quarters
                  className="animate-spin"
                  size="1.2rem"
                />
              )}
              {!false && <FiPlusSquare size="1.2rem" />}
            </button>
          </div>
        </div>
        {address === owner && (
          <div>
            <label className="block mb-2 text-xs font-bold text-neutral-600">
              Bucket Balance
            </label>
            <div className="grid grid-cols-5 gap-4">
              <input
                className="col-span-2 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
                type="text"
                placeholder="Side Winner"
                onChange={(e) => setSideWinner(e.target.value)}
              />
              {/* <input
                className="col-span-3 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
                type="text"
                placeholder="Game"
                onChange={(e) => setGame(e.target.value)}
              /> */}
              <button
                className="flex items-center justify-center col-span-3 gap-2 p-2 px-4 transition-all bg-purple-500 rounded-md hover:scale-105"
                onClick={handleSetSideWinner}
              >
                <span className="font-semibold">Set Side Winner</span>
                {loading && (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size="1.2rem"
                  />
                )}
              </button>
              <button
                className="flex items-center justify-center col-span-5 gap-2 p-2 px-4 transition-all bg-purple-500 rounded-md hover:scale-105"
                onClick={handleToggleBet}
              >
                <span className="font-semibold">Toggle Is Open Aarket</span>
                {loading && (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size="1.2rem"
                  />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ContractCard.displayName = 'ContractCard';
