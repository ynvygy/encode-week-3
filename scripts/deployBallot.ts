import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_ADDRESS = "0xDE92a0f5b6ED16c1ae5d87B126d577433846fd4D";
const BLOCK_QUANTITY = 100;

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const signer = wallet.connect(provider);

  const proposals = process.argv.slice(2);

  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    TOKEN_ADDRESS,
    BLOCK_QUANTITY
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const targetBlockNumber = await ballotContract.targetBlockNumber();
  console.log(`Voting will start at block ${targetBlockNumber}`);
};

main().catch((error) =>{
    console.error(error);
    process.exitCode = 1;
})