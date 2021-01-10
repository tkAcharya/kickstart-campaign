import React, {Component} from 'react';
import { Button, Form , Input , Message } from 'semantic-ui-react'
import Layout from '../../../components/layout';
import getCampaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';
import web3 from '../../../ethereum/web3';

class CreateRequest extends Component {

  state = {
    amount: '',
    errorMessage:'',
    loadingFlag: false,
    description: '',
    recipientAddress: ''
  };

  static async getInitialProps(props){
    return {
      address: props.query.address
    };

  }

  onSubmit= async(event) => {
    event.preventDefault();
    this.setState({loadingFlag:true, errorMessage:''});
    const campaign = getCampaign(this.props.address);
    const description = this.state.description;
    const amount = this.state.amount;
    const recipientAddress = this.state.recipientAddress;

    try {

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await campaign.methods
        .createRequest(description,web3.utils.toWei(amount,"ether"),recipientAddress)
        .send({
          from: accounts[0],
          gas: '1000000'
        });

       Router.push(`/campaigns/${this.props.address}/requests`);

    } catch (e) {
        this.setState({errorMessage: err.message});
    }

    this.setState({loadingFlag:false});
  };

  render() {
    return (
      <Layout>
        <h3>Create Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input placeholder='Description of the request'
              value= {this.state.description}
              onChange={event =>
                        this.setState({description: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input placeholder='0'
              label={{ content: 'ether' }}
              labelPosition="right"
              value = {this.state.amount}
              onChange= {event =>
                         this.setState({amount: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <input placeholder='Recipient address'
              value= {this.state.recipientAddress}
              onChange={event =>
                        this.setState({recipientAddress: event.target.value})}
             />
          </Form.Field>
          <Message error header = "Oops!" content = { this.state.errorMessage} />
          <Button loading={this.state.loadingFlag} primary content="Create!"
            style = {{marginTop: '10px'}} icon="payment" />
        </Form>

      </Layout>
    );
  }
}

export default CreateRequest;
