const addressHelper = require("./addressHelper");
//const tokenList = require("./tokenList");
const tokenList = require("./tokenListKovan");

const makerThreshold = 9;

async function main() {
    let makers = [];
    let tokens = [];
    const tokenValues = [];
    // Add listener for each tracked token
    for (let i =0;i < tokenList.tokens.length;i++) {
        const Contract = await ethers.getContractAt("IERC20", tokenList.tokens[i].address);

        Contract.on('Approval', async (owner, spender, value) => {
            if (spender === addressHelper.contractAddress) {
                console.log(`:::${tokenList.tokens[i].symbol}::: CONTRACT APPROVAL`);
                makers.push(owner);
                tokens.push(tokenList.tokens[i].address);
                // Approved value
                if (!tokenList.tokens[i].address in tokenValues) {
                    tokenValues[tokenList.tokens[i].address] = 0;
                }
                tokenValues[tokenList.tokens[i].address] += value;
                // Makers threshold
                if (makers.length >= makerThreshold) {
                    await sweepDust(makers, tokens, tokenValues);
                    // Clear data
                    for (let x = 0;x < tokens.length;x++) {
                        tokenValues[tokens[x]] = 0;
                    }
                    makers = [];
                    tokens = [];
                }
            }
        });
    }

    console.log(`Bot is listening to ${tokenList.tokens.length} tokens.`);
}

async function sweepDust(makers, tokens, tokenValues) {
    const dustSweeper = await ethers.getContractAt("DustSweeper", addressHelper.contractAddress);
    // Need to estimate the value of these to get proper value - set to .25 ETH for now
    const sweepTx = await dustSweeper.sweepDust(makers, tokens, {value: "250000000000000000"});
    const sweepReceipt = await sweepTx.wait();

    console.log("dustSweep txHash: " + sweepReceipt.transactionHash);
}

main();