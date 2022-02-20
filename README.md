## Backend usage

### Deploy if necessary

1) `npx hardhat run --network kovan scripts/deploy.js`
2) Copy generated `contractAddress` into `scripts/addressHelper.js`
### Sweep Dust (Manually/Testing)

1) Adjust approval settings in `scripts/doApproval.js`
2) `npx hardhat run --network kovan scripts/doApproval.js`
3) Adjust dust settings in `scripts/sweepDust.js`
4) `npx hardhat run --network kovan scripts/sweepDust.js`

### Taker Bot
1) Open terminal and run `npx hardhat run --network kovan scripts/takerBot.js` and leave it open and running
2) Open a new terminal and run `npx hardhat run --network kovan scripts/doApproval.js`
3) When the `makerThreshold` set in `scripts/takerBot.js` is met the sweepDust() method will be called on the DustSweeper contract.

### Mainnet Fork
1) Open terminal and run a hardhat node: `npx hardhat node`
2) Open another terminal and deploy DustSweeper contract: `npx hardhat --network localhost run scripts/deploy.js`
3) Copy the address the DustSweeper contract was deployed to into `scripts/addressHelper.js` contractAddress
4) In that same terminal start the bot: `npx hardhat --network localhost run scripts/takerBot.js` and wait until it console logs that it is listening
5) Use either `npx hardhat --network localhost run scripts/doApproval.js` or the frontend to approve tokens.