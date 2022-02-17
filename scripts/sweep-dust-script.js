const ethers = require("ethers");
const { getDefaultProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const {ContractFactory} = require("@e")
const {
  abi: dustsweeperABI,
  bytecode: dustsweeperBytecode
} = require("../artifacts/contracts/DustSweeper.sol/DustSweeper.json");
const dustsweeperInterface = new ethers.utils.Interface(dustsweeperABI);
require("dotenv").config();

const PK = process.env.PRIVATE_KEY;
const ALCHEMY_FORK = process.env.ALCHEMY_FORK;
const dustsweeperAddress;

async function main() {
    const provider = getDefaultProvider(ALCHEMY_FORK);

    const signer = new Wallet(PK, provider);

    const dustSweeperContract = new ethers.ContractFactory( dustsweeperInterface , dustsweeperBytecode  , signer )

    //const dustSweeperDeployed = dustSweeperContract.attach(dustsweeperAddress)

    //const sweepTx = dustSweeperDeployed.sweepDust()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
