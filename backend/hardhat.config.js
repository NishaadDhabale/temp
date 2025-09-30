require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.28',
  networks: {
    hardhat: {
      chainId: 1337, // <-- Add this line
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 1337, // <-- And this line
    },
  },
};
