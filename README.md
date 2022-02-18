## Backend usage

### Deploy if necessary

1) `npx hardhat run --network kovan scripts/deploy.js`
2) Copy generated `contractAddress` into `scripts/addressHelper.js`
### Sweep Dust

1) If approval needed adjust settings in `scripts/doApproval.js:
2) `npx hardhat run --network kovan scripts/doApproval.js`
3) Adjust settings in `scripts/sweepDust.js`
4) `npx hardhat run --network kovan scripts/sweepDust.js`