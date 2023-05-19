import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const { TOKEN_ADDRESS, VOTER_ADDRESS } = require("./config");

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
  const grantMinterRole = await contract.grantMinterRole(VOTER_ADDRESS);
  const grantMinterRoleTxReceipt = await grantMinterRole.wait();
  console.log(
    `The transaction hash is ${grantMinterRoleTxReceipt.transactionHash} included in the block ${grantMinterRoleTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
