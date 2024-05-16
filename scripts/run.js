const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  // Connect to the networks
  let infuraProvider = new hre.ethers.providers.InfuraProvider(
    "mainnet",
    process.env.INFURA_API_KEY
  );

  let alchemyProvider = new hre.ethers.providers.AlchemyProvider(
    "mainnet",
    process.env.ALCHEMY_API_KEY
  );

  while (true) {
    let wallets = [];
    for (let i = 0; i < 100; i++) {
      wallets.push(hre.ethers.Wallet.createRandom());
    }

    console.log(`wallets: ${wallets.map((wallet) => wallet.address)}`);

    for (let i = 0; i < wallets.length; i++) {
      // Choose the provider based on the current iteration
      let provider = i % 2 === 0 ? infuraProvider : alchemyProvider;

      await provider
        .getBalance(wallets[i].address)
        .then((balance) => {
          let ethBalance = hre.ethers.utils.formatEther(balance);
          if (parseFloat(ethBalance) > 0.0) {
            let data = `Wallet: ${wallets[i].address}, Private Key: ${wallets[i].privateKey}, Balance: ${ethBalance}\n`;
            fs.appendFileSync("non_zero_balances.txt", data, (err) => {
              if (err) throw err;
            });
          }
          console.log(`Wallet: ${wallets[i].address}, Balance: ${ethBalance}`);
        })
        .catch((err) => {
          console.error(err);
          fs.writeFileSync("error_log.txt", err.message, (err) => {
            if (err) throw err;
          });
        });
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  fs.writeFileSync("error_log.txt", error.message, (err) => {
    if (err) throw err;
  });
  process.exitCode = 1;
});
