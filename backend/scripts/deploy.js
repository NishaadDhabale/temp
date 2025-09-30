const hre = require("hardhat");

async function main() {
  const BlueCarbonRegistry = await hre.ethers.getContractFactory("BlueCarbonRegistry");
  const registry = await BlueCarbonRegistry.deploy();

  // THIS IS THE FIX:
  // We are using the modern .waitForDeployment() instead of the old .deployed()
  await registry.waitForDeployment();

  // Using .getAddress() is also the modern, robust way
  const registryAddress = await registry.getAddress();
  console.log(`BlueCarbonRegistry deployed to: ${registryAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});