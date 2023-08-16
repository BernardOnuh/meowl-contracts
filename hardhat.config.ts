import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter"
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from 'dotenv'
dotenv.config()


const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) {
  throw new Error("Missing env variable `RPC_URL`");
}

const CMC = process.env.CMC;
if (!CMC) {
  throw new Error("Missing env variable `CMC`");
}

const DEPLOYER = process.env.DEPLOYER;
if (!DEPLOYER) {
  throw new Error("Missing env variable `DEPLOYER`");
}

const ETHERSCAN = process.env.ETHERSCAN;
if (!ETHERSCAN) {
  throw new Error("Missing env variable `ETHERSCAN`");
}

const BASE_ETHERSCAN = process.env.BASE_ETHERSCAN;
if (!BASE_ETHERSCAN) {
  throw new Error("Missing env variable `BASE_ETHERSCAN`");
}

const config: any = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL,
      },
      chainId: 1
    },
    goerli: {
      url: "https://serene-burned-dust.ethereum-goerli.quiknode.pro/1d5890b6aae2953f8d58297d28ed5c39dc366f85/",
      accounts: [
        DEPLOYER
      ],
      chainId: 5,
    },
    mainnet: {
      url: "https://fittest-frosty-breeze.quiknode.pro/78497407dfef9bc0f0b19d5780c1f1bfc78850e0/",
      accounts: [
        DEPLOYER
      ],
      chainId: 1,
    },
    base: {
      url: "https://developer-access-mainnet.base.org",
      accounts: [
        DEPLOYER
      ],
      chainId: 8453,
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.19",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ]
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN,
      base: BASE_ETHERSCAN,
      goerli: ETHERSCAN
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/"
        }
      }
    ]
  },
  gasReporter: {
    coinmarketcap: CMC,
    currency: "eth"
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
  },

};

export default config;
