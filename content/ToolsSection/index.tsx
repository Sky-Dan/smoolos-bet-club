import { CustomLink } from 'components/CustomLink';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IToolsSection {
  nfts: { image: string; edition: number }[];
}

export const ToolsSection = ({ nfts }: IToolsSection) => {
  // console.log('a');

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
                href={`https://testnets.opensea.io/assets/mumbai/${process.env.NEXT_PUBLIC_SOMOOLOS_NFT_ADDRESS}/${nft.edition}`}
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
