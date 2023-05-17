import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const TOKEN_ADDRESS = "0xDE92a0f5b6ED16c1ae5d87B126d577433846fd4D"
const VOTER_ADDRESS = "0x73047EE0903e8A9A4c4D2448e56Bc89850D37e4A"

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
