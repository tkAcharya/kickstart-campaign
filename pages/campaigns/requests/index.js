import React, {Component} from 'react';
import { Card, Grid , Button , Table , Container } from 'semantic-ui-react'
import Layout from '../../../components/layout';
import getCampaign from '../../../ethereum/campaign';
import {Link} from '../../../routes';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

  static async getInitialProps(props) {

    const campaign = getCampaign(props.query.address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element,index)=> {
        return campaign.methods.requests(index).call()
      })
    );

    return {
      address: props.query.address,
      requests,
      requestCount,
      approversCount
    };
  }

  renderRow() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
      />
    });
  }

  render() {

    //instead of writting table always we can use ES6
    const {Header,Row,HeaderCell,Body} = Table;

    return (
      <Layout>
      <Link route={`/campaigns/${this.props.address}/requests/new`}>
        <a>
          <Button floated="right" content='Create Request' icon='add square' primary />
        </a>
      </Link>
        <h3>Request List</h3>
        <Table celled structured>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRow()}
          </Body>
        </Table>
        <div> Found requests: {this.props.requestCount}</div>
        </Layout>

    );
  }
}

export default RequestIndex;
