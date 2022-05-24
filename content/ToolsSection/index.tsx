import { CustomLink } from 'components/CustomLink';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IToolsSection {
  nfts: { image: string; edition: number }[];
}

export const ToolsSection = ({ nfts }: IToolsSection) => {
  return (
    <>
      {nfts.length > 0 ? (
        <div
          className="grid grid-cols-3 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
          style={{ height: '300px' }}
        >
          {nfts.map((nft) => {
            return (
              <CustomLink
                key={nft.edition}
                href={`https://opensea.io/assets/matic/0xa4132e3b9d88954bfdd47411f05a1c992703fc78/${nft.edition}`}
                className="flex items-center justify-center w-[100%] h-[100%] hover:bg-neutral-800 hover:scale-105 transition-all"
              >
                <div>
                  <Image
                    src={nft.image}
                    alt="tools"
                    width="100%"
                    height="100"
                    priority
                    // loading="lazy"
                  />
                </div>
              </CustomLink>
            );
          })}
        </div>
      ) : (
        <div
          className="grid xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4"
          style={{ height: '300px' }}
        >
          <AiOutlineLoading3Quarters
            className="animate-spin"
            size="8rem"
            color="white"
          />
        </div>
      )}
    </>
  );
};
