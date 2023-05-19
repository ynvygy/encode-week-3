import { TokenizedBallot__factory } from "../typechain-types";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();
const { BALLOT_CONTRACT_ADDRESS } = require("./config");

const PROPOSAL_ID = 2
const AMOUNT = "2"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  )

  const signer = wallet.connect(provider);
  
  const amount = ethers.utils.parseUnits(AMOUNT);

  const ballotFactory = new TokenizedBallot__factory(signer);
  const ballotContract = ballotFactory.attach(BALLOT_CONTRACT_ADDRESS);
  const proposals = (await ballotContract.listProposal()).map((element) =>
    ethers.utils.parseBytes32String(element)
  );

  if (PROPOSAL_ID >= proposals.length || PROPOSAL_ID < 0) {
    throw new Error("Invalid vote");
  }

  console.log(`Attached to the contract at address ${ballotContract.address}`);

  console.log(
    `Casting vote to proposal "${
      proposals[PROPOSAL_ID]
    }"`
  );
  const vote = await ballotContract.vote(PROPOSAL_ID, amount);
  const voteTxReceipt = await vote.wait();

  console.log(
    `The transaction hash is ${voteTxReceipt.transactionHash} included in the block ${voteTxReceipt.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
