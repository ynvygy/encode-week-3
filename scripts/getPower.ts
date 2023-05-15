import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const BALLOT_CONTRACT_ADDRESS = "0x43d3A6C1b72DD29aBD66f8f25e88A906df2ec1F1";
const VOTER_ADDRESS = "0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0";

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
