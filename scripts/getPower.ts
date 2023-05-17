import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = "0x7CdF199BB3bc882792D09E9dF41D0FD740cd895c";
const VOTER_ADDRESS = "0x73047EE0903e8A9A4c4D2448e56Bc89850D37e4A";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )

  const signer = wallet.connect(provider);

  const ballotContract = TokenizedBallot__factory.connect(
    BALLOT_CONTRACT_ADDRESS,
    signer
  );

  const votingPower = await ballotContract.votingPower(VOTER_ADDRESS);

  console.log(`The votingPower: ${votingPower}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
