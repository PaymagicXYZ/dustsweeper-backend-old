const addressHelper = require("./addressHelper");

async function main() {
    // We get the contract to deploy
    const DustSweeper = await ethers.getContractFactory("DustSweeper");
    const dustsweeper = await DustSweeper.deploy(
        "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf",
        addressHelper.protocolWallet,
        "0x0000000000000000000000000000000000000000",
        14,
        1,
        100
    );

    console.log("DustSweeper deployed to:", dustsweeper.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });