import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { FeeSharingSystem } from "../typechain-types";

describe("FeeSharingSystem", () => {
  let deployer: Signer;
  let rewardsDistribution: Signer;
  let user1: Signer;
  let feeSharingSystem: FeeSharingSystem;

  beforeEach(async () => {
    [deployer, rewardsDistribution, user1] = await ethers.getSigners();

    const FeeSharingSystemFactory = await ethers.getContractFactory("FeeSharingSystem", deployer);
    feeSharingSystem = await FeeSharingSystemFactory.deploy(rewardsDistribution.address, "rewardsTokenAddress", "stakingTokenAddress");
    await feeSharingSystem.deployed();
  });

  it("should deploy the contract", async () => {
    expect(await feeSharingSystem.rewardsDistribution()).to.equal(rewardsDistribution.address);
  });

  // Add more test cases here...

});
