const ethers = require("ethers");
const { getDefaultProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const {
  abi: dustsweeperABI,
  bytecode: dustsweeperBytecode,
} = require("../artifacts/contracts/DustSweeper.sol/DustSweeper.json");
const {
  abi: erc20ABI,
} = require("../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json");
const { tokens } = require("../tokens.json");
const { get, gt } = require("lodash");
const dustsweeperInterface = new ethers.utils.Interface(dustsweeperABI);
const { getTokenList } = require("../utils");

require("dotenv").config();

const PK = process.env.PRIVATE_KEY;
const dustsweeperAddress = 0x5fbdb2315678afecb367f032d93f642f64180aa3;

async function main() {
  const provider = getDefaultProvider("http://127.0.0.1:8545/");

  console.log(await provider.getNetwork())

  // const signer = new Wallet(PK, provider);

  // const dustSweeperContract = new ethers.ContractFactory(
  //   dustsweeperInterface,
  //   dustsweeperBytecode,
  //   signer
  // );

  // const dustSweeperDeployed = dustSweeperContract.attach(dustsweeperAddress);
  // const sweepTx = dustSweeperDeployed.sweepDust();

  // const tokenAddressArray = getTokenList();

  // let tmpApprovalList = [];
  // for (let i = 0; i < tokenAddressArray.length; i++) {
  //   const erc20Contract = new ethers.Contract(
  //     tokenAddressArray[i],
  //     erc20ABI,
  //     provider
  //   );

  //   const filterSpender = erc20Contract.filters.Approval(
  //     null,
  //     dustsweeperAddress
  //   );
  //   const logsFrom = await erc20Contract.queryFilter(
  //     filterSpender,
  //     -5000,
  //     "latest"
  //   );

  //   for (let j = 0; j < logsFrom.length; j++) {
  //     const owner = get(logsFrom[j], "args.owner");
  //     const spender = get(logsFrom[j], "args.spender");

  //     try {
  //       const allowance = await erc20Contract.allowance(owner, spender);

  //       if (allowance.gt("0")) {
  //         let approval = logsFrom[j];
  //         const symbol = await erc20.symbol();
  //         const decimals = await erc20.decimals();

  //         console.log(allowance);
  //         console.log(decimals);
  //         approval.owner = owner;
  //         approval.spender = spender;
  //         approval.symbol = symbol;
  //         approval.allowance = allowance;
  //         approval.decimals = decimals;
  //         tmpApprovalList.push(approval);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
