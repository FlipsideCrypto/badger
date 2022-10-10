const { getChainId, ethers, network } = require("hardhat");
const chainId = await getChainId()

async function main() {


const [owner] = await ethers.getSigners();

const addressToSendTo = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"

if (chainId !== '31337') {
  console.log('Easy there killer, this isnt the hardhat network.')
}
else {
  await owner.sendTransaction({
      to: "0x581BEf12967f06f2eBfcabb7504fA61f0326CD9A",
      value: ethers.utils.parseEther("5.0"), // Sends exactly 1.0 ether
    });
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});