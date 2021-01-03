import React, {Component} from 'react';
import factory from '../ethereum/factory'


class CampaignHomePage extends Component {


  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaign().call();

    return { campaigns: campaigns}; // return {campaigns}
  }

  render() {
    return <h1>This is {this.props.campaigns[0]}</h1>;
  }
}

export default CampaignHomePage;
