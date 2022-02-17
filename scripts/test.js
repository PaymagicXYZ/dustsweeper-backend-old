async function main() {
    const DustSweeper = await hre.ethers.getContractAt("DustSweeper", "0x9065d3836b8d7e969C0423f4cce45F9D39fE570B");
    const estimate = await DustSweeper.estimateGas.sweepDust(
        [
            "0x2619fEf2C238a0f1170160Ec0000Da1777337967",
            "0x2619fEf2C238a0f1170160Ec0000Da1777337967",
            "0x2619fEf2C238a0f1170160Ec0000Da1777337967",
            //"0xD36DDB951531ab346350F742F2f9BCE9160C61d0",
            //"0x06bd546C8A2F3549a21D8ba0Ab27A350b7891882"
        ],
        [
            "0xa36085F69e2889c224210F603D836748e7dC0088",
            //"0xa36085F69e2889c224210F603D836748e7dC0088",
            //"0xa36085F69e2889c224210F603D836748e7dC0088"
            "0x162c44e53097e7B5aaE939b297ffFD6Bf90D1EE3",
            "0x482dC9bB08111CB875109B075A40881E48aE02Cd"
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