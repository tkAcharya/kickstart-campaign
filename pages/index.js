import React, {Component} from 'react';
import {Card , Button } from 'semantic-ui-react';

import factory from '../ethereum/factory'


class CampaignHomePage extends Component {


  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaign().call();

    return { campaigns: campaigns}; // return {campaigns}
  }

  renderCampaigns(){
    const items = this.props.campaigns.map( address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }


  render() {
    return <div>
    <link
  rel="stylesheet"
  href="//cdn.jsdelivr.net/npm/semantic-ui@2.0.1/dist/semantic.min.css"
/>
    <h3>Open Campaigns</h3>
    {this.renderCampaigns()}
    <Button content='Create Campaign' icon='add square' primary />
    </div>;
  }
}

export default CampaignHomePage;
