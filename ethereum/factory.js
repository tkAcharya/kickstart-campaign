import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//require('dotenv').config();

//const deployedContractAddress = process.env.deployedContractAddress;
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x7c8788e5BdCA04386C71283f64e7eD7979F36790"
);

export default instance;
