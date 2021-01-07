import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

//require('dotenv').config();

//const deployedContractAddress = process.env.deployedContractAddress;
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x89699d90576d8826108eF28C81eFE4874d9C9198"
);

export default instance;
