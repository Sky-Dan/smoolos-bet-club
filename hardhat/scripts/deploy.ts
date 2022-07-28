import { ethers } from 'hardhat';

async function main() {
  const BettingClub = await ethers.getContractFactory('BettingClub');
  const bettingClub = await BettingClub.deploy(
    '0xa4132e3b9d88954bfdd47411f05a1c992703fc78'
  );

  await bettingClub.deployed();

  console.log('bettingClub with 1 ETH deployed to:', bettingClub.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
