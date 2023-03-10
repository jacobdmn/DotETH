import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
// import "hardhat-deploy" // add this line
require("dotenv").config()

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
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
  // namedAccounts: {
  //   deployer: {
  //     default: 0,
  //     goerli: 0,
  //   },
  //   feeCollector: {
  //     default: 0,
  //   },
  // },
}

export default config
