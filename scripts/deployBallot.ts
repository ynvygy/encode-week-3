import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_ADDRESS = "0xAB5a06Cf25BB39Edcfa4B15b65FDfa7e96639eA6";
const BLOCKS_QUANTITY = 15000;

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )
  const signer = wallet.connect(provider);

  const proposals = process.argv.slice(2);

  console.log("Deploying TokenizedBallot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal No. ${index + 1}: ${element}`);
  });

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.utils.formatBytes32String),
    TOKEN_ADDRESS,
    BLOCKS_QUANTITY
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const targetBlockNumber = await ballotContract.targetBlockNumber();
  console.log(`Voting will end at block ${targetBlockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
