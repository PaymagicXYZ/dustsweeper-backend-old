## Backend usage

### Deploy if necessary

1) `npx hardhat run --network hardhat scripts/deploy.js`
2) Copy generated `contractAddress` into `scripts/addressHelper.js`
### Sweep Dust (Manually/Testing)

1) Adjust approval settings in `scripts/doApproval.js`
2) `npx hardhat run --network hardhat scripts/doApproval.js`
3) Adjust dust settings in `scripts/sweepDust.js`
4) `npx hardhat run --network hardhat scripts/sweepDust.js`

### Taker Bot
1) Open terminal and run `npx hardhat run --network hardhat scripts/takerBot.js` and leave it open and running
2) Open a new terminal and run `npx hardhat run --network hardhat scripts/doApproval.js`
3) When the `makerThreshold` set in `scripts/takerBot.js` is met the sweepDust() method will be called on the DustSweeper contract.