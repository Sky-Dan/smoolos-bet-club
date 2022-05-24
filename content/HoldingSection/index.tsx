interface IHoldingSection {
  totalHoldingMatic: string;
  totalSupply: number;
  totalHolders: string;
}

export const HoldingSection = ({
  totalHoldingMatic,
  totalHolders,
  totalSupply,
}: IHoldingSection) => {
  return (
    <div
      className="grid grid-cols-3 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
      style={{ height: '300px' }}
    >
      <span className="text-center text-white">
        TOTAL MINTED {"NFT's"}:{' '}
        <span className="text-purple-500 display-4">{totalSupply}</span>
      </span>
      <span className="text-center text-white">
        TOTAL MATIC HOLDING:{' '}
        <span className="text-purple-500 display-4">
          {totalHoldingMatic} MATIC
        </span>
      </span>
      <span className="text-center text-white">
        TOTAL HOLDERS:{' '}
        <span className="text-purple-500 display-4">{totalHolders}</span>
      </span>
    </div>
  );
};
