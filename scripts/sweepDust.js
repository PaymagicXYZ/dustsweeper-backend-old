const addressHelper = require("./addressHelper");

async function main() {
    const accounts = await ethers.getSigners();

    const makers = [
        accounts[1].address,
        accounts[2].address,
        accounts[1].address,
        accounts[2].address
    ];
    const tokens = [
        addressHelper.keep3rTokenAddress,
    ];

    const dustSweeper = await ethers.getContractAt("DustSweeper", addressHelper.contractAddress);
    const sweepTx = await dustSweeper.sweepDust(makers, tokens, {value: "90000000000000000"});
    const sweepReceipt = await sweepTx.wait();

    console.log("dustSweep txHash: " + sweepReceipt.transactionHash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });