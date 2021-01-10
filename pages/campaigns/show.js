import React, {Component} from 'react';
import { Card, Grid , Button } from 'semantic-ui-react'
import Layout from '../../components/layout';
import ContributeForm from '../../components/contributeForm';
import getCampaign from '../../ethereum/campaign';
import {Link } from '../../routes';


class CampaignShow extends Component {

  static async getInitialProps(props) {
    //console.log(props.query.address);
    const campaign = getCampaign(props.query.address);

    const campaignSummary = await campaign.methods.getSummary().call();
    console.log(campaignSummary);
    return {
      address: props.query.address,
      balance: campaignSummary[0],
      minimumContribution: campaignSummary[1],
      requestCount: campaignSummary[2],
      approversCount: campaignSummary[3],
      manager: campaignSummary[4]
    };
  }

  renderCards(){
    const {
      balance,
      minimumContribution,
      requestCount,
      approversCount,
      manager
    } = this.props;

    const items = [
      {
        header: manager,
        description:
          'Manager can create campaign and can create requests to spend amount.',
        meta: 'Address Of Manager',
        style: { overflowWrap: 'break-word'},
      },
      {
        header: balance,
        description:
          'Balance present in the campaign, this is the amount untilised yet.',
        meta: 'Balance',
      },
      {
        header: requestCount,
        description:
          'Count of the requests created by the manager to spend.',
        meta: 'Spending Request Count',
      },
      {
        header: approversCount,
        description:
          'Count of the number of contributors to the project',
        meta: 'Contributors',
      },
      {
        header: minimumContribution,
        description:
          'Minimum Contribution required to donate to this campaign as wei',
        meta: 'Minimum Contribution',
      },
    ];

    return items;
  }

  render(){
    return (
      <Layout>

          <h3> Campaign Details </h3>
          <Grid>
            <Grid.Column width={10}>
              <Card.Group items={this.renderCards()} />
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <Button content="View Requests" primary style = {{marginTop: '10px'}}/>
              </Link>

            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid>
      </Layout>
    )
  }

}

export default CampaignShow;
