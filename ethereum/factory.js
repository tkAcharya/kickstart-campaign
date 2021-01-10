import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//require('dotenv').config();

//const deployedContractAddress = process.env.deployedContractAddress;
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x6c365404b3840eB59F22A59423371f1f2CaA9aff"
);

export default instance;
