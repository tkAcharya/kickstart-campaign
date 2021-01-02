const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.mnemonic,
  process.env.link
);

const web3 = new Web3(provider);

const deployContract = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to', result.options.address);
  };
deployContract();
