const addressHelper = require("./addressHelper");

async function main() {
    const [account1, account2, account3] = await ethers.getSigners();
    const DustSweeper = await hre.ethers.getContractAt("DustSweeper", addressHelper.contractAddress);
    const estimate = await DustSweeper.estimateGas.sweepDust(
        [
            account1.address,
            //account1.address,
            //account1.address
            account2.address,
            account3.address
        ],
        [
            addressHelper.linkTokenAddress,
            //addressHelper.linkTokenAddress,
            //addressHelper.linkTokenAddress
            addressHelper.zrxTokenAddress,
            addressHelper.batTokenAddress
        ]
    );

    console.log(estimate);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });