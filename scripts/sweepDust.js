const addressHelper = require("./addressHelper");

async function main() {
    const accounts = await ethers.getSigners();

    const makers = [
        accounts[0].address
    ];
    const tokens = [
        addressHelper.linkTokenAddress
    ];

    const dustSweeper = await ethers.getContractAt("DustSweeper", addressHelper.contractAddress);
    const sweepTx = await dustSweeper.sweepDust(makers, tokens);
    const sweepReceipt = await sweepTx.wait();

    console.log("dustSweep txHash: " + sweepReceipt.transactionHash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });