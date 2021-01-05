import React, {Component} from 'react';
import { Button, Form , Input } from 'semantic-ui-react'

import Layout from '../../components/layout.js';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


class CampaignNew extends Component {

  state = {
    minimumContribution: ''
  };

  onSubmit = async (event) => {
    console.log("Method called");
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })

  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit}>
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
        </Form>
         <Button primary style = {{marginTop: '10px'}}>Create!</Button>
      </Layout>
    ) ;
  }

}

export default CampaignNew;
