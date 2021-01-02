# kickstart-campaign
[![Build Status](https://travis-ci.org/sindresorhus/pageres.svg?branch=master)](https://travis-ci.org/sindresorhus/pageres.svg?branch=master)

## Description 
I have tried to build the code of [KICKSTARTER](https://www.kickstarter.com/) , this is a website where people post their ideas and get investments around it promising to give the product to the investors. This can be secured more by use of blockchain ethereum , to track whether the money is being sent to vendors or being used in personal expenses. This code focuses on providing a basic approach of how we can track , approve expenses for the desired campaign.


### 1. Clone the project 

```sh
$ git clone https://github.com/tkAcharya/kickstart-campaign.git
$ cd kickstart-campaign
```

### 2. Install the modules required for the project 

```sh
$ npm install
$ npm install --save solc ganache-cli web3 mocha
```
 

### 3. Run the test file 

```sh
$ node ./ethereum/compile.js
$ npm test
```

NOTE : This should give you a sample of addresses , and should run the  tests to verify the campaign build and end to end testing

The below step is not required for local setup

### 4. Deploy the Contract to Rinkeby Test Network
 - Download and setup the [metamask extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) of chrome (Store the passphrase with you)
 - You need to create a free account on [infura.io](http://infura.io/)
 - Create a project in the infura and store the endpoint for rinkeby network
 - Install the following packages(if not present)
  
```sh
$ npm install –-save truffle-hdwallet-provider@0.0.3
$ npm install -- save dotenv
```
 - Write the passphrase of metamask in the mnemonic field in .env file present in ethereum folder
 - Write the rinkeby test network link in the link field in .env file present in ethereum folder
 - Run ```node deploy.js```
 
 ### 5. Verify the deployed Contract to Rinkeby Test Network
 
 After running the deploy file , you would have got a message like "Contract Deployed to <XYZ>"
 
 Copy the xyz and paste it in [rinkebyNetwork](https://rinkeby.etherscan.io/)
 
 You will be able to view your contract info in the dashboard.

## Features

- [x] Offline support
- [x] Cross-platform
- [x] Awesome sounds
- [x] No singup/login required
- [ ] Auto launch
- [ ] Auto updates

## Ethereum Code Beautifiers for different editors
- [Atom]( https://atom.io/packages/language-ethereum)
- [Sublime]( https://packagecontrol.io/packages/Ethereum)
- [VSCode]( https://github.com/juanfranblanco/vscode-solidity)
- [Webstorm]( https://plugins.jetbrains.com/plugin/9475-intellij-solidity)
- [VIM]( https://github.com/tomlion/vim-solidity)

Learnt from [Udemy Course Link]( https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#### If facing some issues : 

1. Always remove node_modules folder and then do <**node install updates**> to get all the dependencies

2. If facing ganache or web3 related issues (web3 is in constant modification so , use the versioning instead .26)
After that run <**npm install --save mocha ganache-cli web3@1.0.0-beta.26**>

3. Put the console.log and verify if any variable from the compile is coming as undefined.
Now run <npm run test> to verify if the whole code is working


 Basic Terminologies in the Solidity Code : 
 - **Contracts** : this contains .sol file mentioning our contract
 
 - **test** : this contains the test.js file (using some mocha code)
 
 - **package.json** : we keep this inside our root directory (have some script inside it , and it also captures different dependency being used)
 
 - **compile.js** : compiles our soldity files (node compile.js)
 
 - **deploy.js** : script file to take the compiled code and deploy it.
 
 - **Running the tests** : npm run test
