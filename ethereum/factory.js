import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// Contract instance deployed at the given address with the abi sourced locally
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9F4dE0F975B3628a6d520b1a57Ed6721a10f1c9B'
);

export default instance;