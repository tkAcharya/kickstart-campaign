import React, {Component} from 'react';
import Layout from '../../components/layout';

class CampaignShow extends Component {

  renderCampaignDetails(){

    return (
      <div>Enjoy</div>
    );
  }

  render(){
    return (
      <Layout>
        <div>
          <h3> Campaign Details </h3>
          {this.renderCampaignDetails()}
        </div>
      </Layout>
    )
  }

}

export default CampaignShow;
