require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mainnet: {
      url: `https://mainnet.infura.io/v3/b1cb71563db94ea39a14e0728a5395ad`,
    },
  },
  solidity: {
    version: "0.8.17",
  },
};
