const { expect } = require("chai");
const addressHelper = require("../scripts/addressHelper");

let dustSweeperContract, accounts, tokenAccount;

describe("DustSweeper", function () {
    before(async () => {
        // Accounts
        accounts = await ethers.getSigners();
        // Token Account - Impersonate account for mainnet fork testing
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0x7abE0cE388281d2aCF297Cb089caef3819b13448"],
        });
        tokenAccount = await ethers.getSigner("0x7abE0cE388281d2aCF297Cb089caef3819b13448")
        // Deploy
        const DustSweeper = await ethers.getContractFactory("DustSweeper");
        dustSweeperContract = await DustSweeper.deploy(
            "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf",
            addressHelper.protocolWallet,
            "0x0000000000000000000000000000000000000000",
            900,
            100,
            100
        );
    });

    it("Do approvals", async function () {
        const approvals = [
            {
                tokenAddress: addressHelper.linkTokenAddress,
                approve: "3000000000000000000"
            }
        ]

        for (let a = 0;a < approvals.length;a++) {
            const tokenContract = await ethers.getContractAt("IERC20", approvals[a].tokenAddress);
            // Approve
            const approveTx = await tokenContract.connect(tokenAccount).approve(
                dustSweeperContract.address,
                approvals[a].approve
            );
            await approveTx.wait();
            // Allowance
            const allowance = await tokenContract.connect(tokenAccount).allowance(
                tokenAccount.address,
                dustSweeperContract.address
            );
            expect(allowance.toString()).to.equal(approvals[a].approve);
        }
    });

    it("Sweep Dust", async function () {
        const makers = [tokenAccount.address];
        const tokens = [addressHelper.linkTokenAddress];
        const dustSweeper = await ethers.getContractAt("DustSweeper", dustSweeperContract.address);
        // Get Price
        const quoteETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        const quotePrice = await dustSweeper.getPrice(tokens[0], quoteETH);
        console.log("Quote price: ", quotePrice.toString());
        // Get discounted price
        const numberOfTokens = 3; // Hardcoded for now
        const discountPercent = 1000; // 10%
        const pow = ethers.BigNumber.from("10").pow(4);
        const discountedPrice = quotePrice.mul(pow.sub(discountPercent)).div(pow).mul(numberOfTokens);
        console.log("Discounted Price: ", discountedPrice.toString());
        // Sweep Dust
        const balanceBefore = await ethers.provider.getBalance(accounts[1].address);
        console.log("Account balance before: ", balanceBefore.toString());
        const sweepTx = await dustSweeper.connect(accounts[1]).sweepDust(makers, tokens, {value: "90000000000000000"});
        const sweepReceipt = await sweepTx.wait();
        const txGasUsed = sweepReceipt.gasUsed;
        console.log("sweepDust gas used: ", txGasUsed.toString());
        const txFee = txGasUsed.mul(sweepReceipt.effectiveGasPrice);
        console.log("sweepDust tx fee: ", txFee.toString());
        const balanceAfter = await ethers.provider.getBalance(accounts[1].address);
        console.log("Account balance after: ", balanceAfter.toString());
        const balanceDifference = balanceBefore.sub(balanceAfter);
        console.log("Balance difference(wei): ", balanceDifference.toString());
        const balanceDifferenceLessGas = balanceDifference.sub(txFee);
        console.log("ETH paid for ERC20: ", balanceDifferenceLessGas.toString());
        const offBy = balanceDifferenceLessGas.sub(discountedPrice);
        console.log("Off by: ", offBy.toString());

        expect(balanceDifferenceLessGas).to.equal(discountedPrice);
    });
});