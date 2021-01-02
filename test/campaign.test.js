const assert = require('assert');
const AssertionError = require('assert').AssertionError;
const ganache = require('ganache-cli');
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

  await factory.methods.createCampaign('100')
     .send({
       from: accounts[0],
       gas: '1000000'
     });

  [campaignAddress] = await factory.methods.getDeployedCampaign().call();
  // this automatically assigns 0th element to campaignAddress

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});


describe( "Campaign Tests" , () => {

  it("Verifying the web3 ethereum", ()=>{
    console.log(accounts);
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("Verifying the manager",async () => {
    assert.equal(accounts[0],await campaign.methods.manager().call())
  });

  it("Verifying the approver", async() => {

    await campaign.methods.contribute().send({
      from: accounts[1],
      gas: '1000000',
      value: '200'
    });
    //const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(!await campaign.methods.approvers(accounts[2]).call());
    assert(await campaign.methods.approvers(accounts[1]).call());
  });

  it("verifying for the minimum contribution to be made ", async () => {
    const flag = false;
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        gas: '1000000',
        value: '20'
      });
      assert(false);
    } catch (e){
      if (e instanceof AssertionError)
        assert(false);
      assert.ok(e);
    }
  });

  it("allows manager to create a payment request", async () => {
    await campaign.methods.createRequest('Buy battery','100',accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    });

    const request = await campaign.methods.requests(0).call();
    assert.ok('Buy battery', request.description);
    // console.log(request);
  });

  it("end to end testing", async () => {

    await campaign.methods.contribute().send({
      from: accounts[1],
      gas: '1000000',
      value: web3.utils.toWei("10","ether")
    });

    await campaign.methods.contribute().send({
      from: accounts[2],
      gas: '1000000',
      value: web3.utils.toWei("10","ether")
    });

    await campaign.methods
    .createRequest('Buy battery',web3.utils.toWei("10","ether"),accounts[3])
    .send({
      from: accounts[0],
      gas: '1000000'
    });

    const initialBalance = await web3.eth.getBalance(accounts[3]);

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    const finalBalance = await web3.eth.getBalance(accounts[3]);
    const differenceBalance = finalBalance-initialBalance;
    //console.log(differenceBalance);
    assert(differenceBalance > web3.utils.toWei('5','ether'))
  });




});
