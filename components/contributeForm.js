import React, {Component} from 'react';
import { Button, Form , Input , Message } from 'semantic-ui-react';

import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';
import {Router} from '../routes';

class ContributeForm extends Component {


  state = {
    contribution: '',
    errorMessage:'',
    loadingFlag: false
  };

  onSubmit = async (event) => {
    //console.log("Method called");
    event.preventDefault();
    const campaign = getCampaign(this.props.address);
    this.setState({loadingFlag:true, errorMessage:''});
    try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
            .contribute()
            .send({
              from: accounts[0],
              gas: '1000000' ,
              value: this.state.contribution
            })

        Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch(err) {
        this.setState({errorMessage: err.message});
    }

    this.setState({loadingFlag:false});
  };


  render() {

    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
            <Input
                label={{ content: 'wei' }}
                labelPosition='right'
                value = {this.state.contribution}
                onChange={event =>
                  this.setState({contribution: event.target.value})}
            />
        </Form.Field>

        <Message error header = "Oops!" content = { this.state.errorMessage} />
        <Button loading={this.state.loadingFlag} primary content="Contribute!"
        style = {{marginTop: '10px'}} floated="right" icon="payment" />
      </Form>

    );

  }

}

export default ContributeForm;
