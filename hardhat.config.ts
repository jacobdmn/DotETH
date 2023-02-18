import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy" // add this line
require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_API_KEY}` || "",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.GAS_REPORT != undefined,
    currency: "USD",
  },
  namedAccounts: {
    deployer: {
      default: 0,
      goerli: 0,
    },
    feeCollector: {
      default: 0, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      goerli: 0,
    },
  },
}

export default config
