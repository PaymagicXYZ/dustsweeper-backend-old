const addressHelper = require("./addressHelper");

async function main() {
    const accounts = await ethers.getSigners();

    const approvals = [
        {
            tokenAddress: addressHelper.linkTokenAddress,
            approve: "3000000000000000000"
        },
        {
            tokenAddress: addressHelper.zrxTokenAddress,
            approve: "50000000000000000000"
        },
        {
            tokenAddress: addressHelper.batTokenAddress,
            approve: "30000000000000000000"
        },
    ]

    for (let i = 0;i < accounts.length;i++) {
        for (let a = 0;a < approvals.length;a++) {
            const tokenContract = await ethers.getContractAt("IERC20", approvals[a].tokenAddress);
            // Approve
            await tokenContract.connect(accounts[i]).approve(
                addressHelper.contractAddress,
                approvals[a].approve
            );
            // Allowance
            const allowance = await tokenContract.connect(accounts[i]).allowance(
                accounts[i].address,
                addressHelper.contractAddress
            );
            console.log(`Approval for account: ${accounts[i].address} of ${approvals[a].approve} to tokenAddress: ${approvals[a].tokenAddress}, current allowance: ${allowance.toString()}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });