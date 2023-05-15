import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_ADDRESS = "0xAB5a06Cf25BB39Edcfa4B15b65FDfa7e96639eA6"
const VOTER_ADDRESS = "0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )

  const signer = wallet.connect(provider);

  const contractFactory = new MyToken__factory(signer);
  const contract = await contractFactory.attach(TOKEN_ADDRESS);
  console.log(`Attached to the contract at address ${contract.address}`);

  console.log(`Delegating to ${VOTER_ADDRESS}`);
  const delegate = await contract.delegate(VOTER_ADDRESS);
  const delegateTxReceipt = await delegate.wait();
  console.log(
    `The transaction hash is ${delegateTxReceipt.transactionHash} included in the block ${delegateTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
