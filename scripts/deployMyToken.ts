import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )

  const signer = wallet.connect(provider);

  const contractFactory = new MyToken__factory(signer);
  const contract = await contractFactory.deploy();
  const contractDeployTxReceipt = await contract.deployTransaction.wait();
  console.log(
    `The contract was deployed at address ${contract.address} at block ${contractDeployTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
