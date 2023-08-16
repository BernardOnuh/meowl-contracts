import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { MeowlFeeSharingWithCompounding, IUniswapV2Router02, IRewardsDistribution } from '../typechain-types';

describe('MeowlFeeSharingWithCompounding', function () {
  let meowlFeeSharing: MeowlFeeSharingWithCompounding;
  let owner: Signer;
  let user1: Signer;
  let mockUniswapRouter: IUniswapV2Router02;
  let mockRewardsDistribution: IRewardsDistribution;

  before(async function () {
      // Use getContractAt to get an instance of the already deployed mock RewardsDistribution
      mockRewardsDistribution = await ethers.getContractAt('IRewardsDistribution', 'REWARDS_DISTRIBUTION_ADDRESS_HERE');

      // Get signers
      [owner, user1] = await ethers.getSigners();
    });

  it('should allow deposits and withdrawals', async function () {
      // Use getContractAt to get an instance of the already deployed mock Uniswap router
      mockUniswapRouter = await ethers.getContractAt('IUniswapV2Router02', 'UNISWAP_ROUTER_ADDRESS_HERE');

      // Deploy the contract with the mock Uniswap router
      const MeowlFeeSharingWithCompounding = await ethers.getContractFactory('MeowlFeeSharingWithCompounding');
      meowlFeeSharing = await MeowlFeeSharingWithCompounding.deploy("mockRewardsDistribution", "mockUniswapRouter") as MeowlFeeSharingWithCompounding;
  });

    
  it('should allow deposits and withdrawals', async function () {
    // Deposit MEOWL tokens
    const depositAmount = ethers.utils.parseEther('10');
    await meowlFeeSharing.connect(user1).deposit(depositAmount);

        // Check user's shares and total shares
        const userShares = await meowlFeeSharing.userInfo(await user1.getAddress());
        const totalShares = await meowlFeeSharing.totalShares();
        expect(userShares).to.equal(totalShares);
    
        // Withdraw shares
        await meowlFeeSharing.connect(user1).withdraw(depositAmount);
    
        // Check user's shares and total shares after withdrawal
        const userSharesAfterWithdrawal = await meowlFeeSharing.userInfo(await user1.getAddress());
        const totalSharesAfterWithdrawal = await meowlFeeSharing.totalShares();
        expect(userSharesAfterWithdrawal).to.equal(totalSharesAfterWithdrawal);
      });
    
      /* */
    });