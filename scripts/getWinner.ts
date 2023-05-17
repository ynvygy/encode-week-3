import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = "0xd338fB9a98c81f606014904bbb052B7039769c58";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )

  const signer = wallet.connect(provider);

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = ballotFactory.attach(BALLOT_CONTRACT_ADDRESS);
  console.log(`Attached to the contract at address ${ballotContract.address}`);

  const winnerName = ethers.utils.parseBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`The winner name: ${winnerName}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
