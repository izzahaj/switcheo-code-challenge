import { BigNumber, ethers } from "ethers";

const urlOrConnectionInfo: string = "https://bsc-dataseed2.binance.org/";
const tokenContractAddress: string = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";
// Provider for connecting to blockchain since we are only reading data
const provider = new ethers.providers.JsonRpcProvider(urlOrConnectionInfo);

// pass methods to be used here
const abi: string[] = [
  // Get the account balance
  "function balanceOf(address owner) view returns (uint)",
  // get number of decimal places used in token
  "function decimals() view returns (uint)"
];

const contract = new ethers.Contract(tokenContractAddress, abi, provider);

const addresses: string[] = [
  "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392"
];

const getHolders = async (addresses: string[]): Promise<void> => {
  const dec = await contract.decimals();

  for (let i = 0; i < addresses.length; i++) {
    const bal = await contract.balanceOf(addresses[i]);
    // formats balance with unit digits
    const unitDigitsBal = ethers.utils.formatUnits(bal, dec);
    // separates digits with ,
    const formattedBal = ethers.utils.commify(unitDigitsBal);
    console.log(`${addresses[i]} ${formattedBal}`);
  }
}

getHolders(addresses);
