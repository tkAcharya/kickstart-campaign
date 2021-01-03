import Web3 from 'web3';

// const web3 = new web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' &&
    typeof window.web3 !== 'undefined') { // Browser and metamask check

  web3 = new Web3(window.web3.currentProvider);

} else {
  //For next server or if the browser doesnot have metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/30a4bebab20e465d8a0d5454cc53e450'
  );

  web3 = new Web3(provider);
}

export default web3;
