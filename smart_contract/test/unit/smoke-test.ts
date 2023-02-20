import { assert } from "chai"
import { ethers } from "hardhat"

describe("Smoke test", () => {
  const contractNameSupposed = "ETHDaddy"
  const totalSupply = "1000000"
  let ETHDaddy: any, ethDaddy: any, contractName: string

  beforeEach(async () => {
    ETHDaddy = await ethers.getContractFactory("ETHDaddy")
    ethDaddy = await ETHDaddy.deploy()
    await ethDaddy.deployed()
  })

  it("should return contractNameSupposed", async () => {
    assert.equal(await ethDaddy.name(), contractNameSupposed)
  })
  it("should return totalSupply", async () => {
    assert.equal(await ethDaddy.totalSupply(), totalSupply)
  })
})
