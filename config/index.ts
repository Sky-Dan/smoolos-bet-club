export const RINKEBY_CHAIN_ID = 4;
export const MUMBAI_CHAIN_ID = 80001;
export const POLYGON_CHAIN_ID = 137;
export const LOCALHOST_CHAIN_ID = 1337;
export const SOMOOLOS_CLUB_ADDRESS =
  process.env.NEXT_PUBLIC_SOMOOLOS_CLUB_ADDRESS;

export const SOMOOLOS_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_SOMOOLOS_NFT_ADDRESS;

export const CHAIN_ID =
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string) || POLYGON_CHAIN_ID;
