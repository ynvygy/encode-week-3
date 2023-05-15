import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = "0x43d3A6C1b72DD29aBD66f8f25e88A906df2ec1F1";

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
