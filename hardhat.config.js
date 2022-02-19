require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.4",
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [process.env.PK_ACCOUNT1, process.env.PK_ACCOUNT2, process.env.PK_ACCOUNT3],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
      accounts: [process.env.PK_ACCOUNT1, process.env.PK_ACCOUNT2, process.env.PK_ACCOUNT3],
    },
    hardhat: {
      forking: {
        chainId: 1337,
        url: "http://127.0.0.1:8545"
      }
    }
  },
};