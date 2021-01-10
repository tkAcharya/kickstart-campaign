import React , {Component} from 'react';
import {Table , Button , Container} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import getCampaign from '../ethereum/campaign';

class RequestRow extends Component {

  onApprove=async () => {
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize= async() => {
    const campaign = getCampaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  }


  render(){
    const {Row , Cell} = Table;
    const {id , request , approversCount} = this.props;

    return (
      <Row disabled={request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.amount,'ether')}</Cell>
        <Cell>{request.vendor}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
        {request.complete? null: (
          <Button color="green" basic onClick={this.onApprove}>
            Approve
          </Button>
        )}
        </Cell>
        <Cell>
        {request.complete? null: (
          <Button color="teal" basic onClick={this.onFinalize}> Finalize
          </Button>
        )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
