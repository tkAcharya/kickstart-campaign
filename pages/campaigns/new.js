import React, {Component} from 'react';
import { Button, Form , Input , Message } from 'semantic-ui-react'

import Layout from '../../components/layout.js';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage:'',
    loadingFlag: false
  };

  onSubmit = async (event) => {
    //console.log("Method called");
    event.preventDefault();
    this.setState({loadingFlag:true, errorMessage:''});

    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
              from: accounts[0]
            })

        Router.pushRoute('/');
    } catch(err) {
        this.setState({errorMessage: err.message});
    }

    this.setState({loadingFlag:false});
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                  label={{ content: 'wei' }}
                  labelPosition='right'
                  value = {this.state.minimumContribution}
                  onChange={event =>
                    this.setState({minimumContribution: event.target.value})}
              />
          </Form.Field>

          <Message error header = "Oops!" content = { this.state.errorMessage} />
          <Button loading={this.state.loadingFlag} primary style = {{marginTop: '10px'}}>Create!</Button>
        </Form>

      </Layout>
    ) ;
  }

}

export default CampaignNew;
