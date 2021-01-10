import React, {Component} from 'react';
import { Card, Grid , Button } from 'semantic-ui-react'
import Layout from '../../../components/layout';
import getCampaign from '../../../ethereum/campaign';
import {Link} from '../../../routes';

class RequestIndex extends Component {

  static async getInitialProps(props) {
    return {
      address: props.query.address
    };
  }

  render() {

    return (
      <Layout>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
        <a>
          <Button floated="right" content='Create Request' icon='add square' primary />
        </a>
      </Link>
        <h3>Request List</h3>
      </Layout>

    );
  }
}

export default RequestIndex;
