import { ethers } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function ({
  development,
}: HardhatRuntimeEnvironment) {
  const fundMe: any = await ethers.getContractFactory("FundMe")
  const fundMeContract = await fundMe.deploy()
  await fundMeContract.deployed()
  console.log("FundMe deployed to:", fundMeContract.address)
}
export default func
