pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;


    function createCampaign(uint minimum) public {
        address campaignAddress = new Campaign(minimum,msg.sender);
        deployedCampaigns.push(campaignAddress);
    }

    function getDeployedCampaign() public view returns(address[]){
        return deployedCampaigns;
    }
}


contract Campaign {
    struct Request {
        string description;
        uint amount;
        address vendor;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;

    }

    Request[] public requests;
    address public manager ;
    uint public minimumContribution ;
    mapping (address=>bool) public approvers;
    uint public approversCount;

    modifier onlyManager {
        require(msg.sender == manager );
        _;
    }


    function Campaign(uint minimumValue, address creator)  public {
        manager = creator;
        minimumContribution = minimumValue;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution );

        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string description, uint amount, address vendor)
    onlyManager public {

        Request memory req = Request({
           description: description,
           amount: amount,
           vendor: vendor,
           complete: false,
           approvalCount: 0
        });

        requests.push(req);

    }

    function approveRequest(uint reqNumber) public {
         require(approvers[msg.sender]);
         require(reqNumber < requests.length);

         Request storage request = requests[reqNumber];

         require(!request.approvals[msg.sender]);

         request.approvalCount++;
         request.approvals[msg.sender]=true;


    }

    function finalizeRequest(uint reqNumber) public onlyManager {

        Request storage request = requests[reqNumber];

        require(!request.complete);
        require(request.approvalCount>=approversCount/2);

        request.vendor.transfer(request.amount);
        request.complete=true;


    }

    function getSummary(uint campaignNumber) public view returns (
      uint , uint , uint , uint , address
      ) {

      return (
          this.balance,
          minimumContribution,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestsCount() public view returns ( uint )
    {
      return requests.length;
    }

}
