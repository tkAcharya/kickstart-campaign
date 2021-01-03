import React, {Component} from 'react';
import factory from '../ethereum/factory'


class CampaignHomePage extends Component {

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaign().call();
    console.log(campaigns);
  }

  // constructor(props) {
  //   super(props);
  // }
  render() {
    return <h1>This is the index page</h1>;
  }
}

export default CampaignHomePage;
