// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Voting{
    // state variables 
    bool public startElection;
    bool public endElection;
    address public admin;
    uint public totalCandidates;
    uint electionStartingTime;
    uint public totalVotes;

    // structure for voters and candidates
    struct Voter{
        bool auth;
        bool voted;
        uint256 vote;}

    struct candidate{
        string name;
        uint256 voteCount;}

    // storing voters and candidates data

    mapping(address => Voter) public Voters;
    candidate [] public candidates;


    // constructer to set the owner and other necessary variables
    constructor() public{
        admin = msg.sender;
        totalCandidates = 0;
        totalVotes = 0;
        electionStartingTime = block.timestamp;
    }

    // modifiers to maintain certain conditions
    modifier onlyOwner{
        require(msg.sender == admin,'for this operation only admin has previlages');
        _;
    }
    modifier beforeElectionStart{
        require(startElection == false,'Election has been started');
        _;
    }
    modifier afterEndElection{
        require(endElection == true,'Election has been not ended yet');
        _;
    }


    // functions to add votes and candidates
    function Addvoter(address _addr)external onlyOwner beforeElectionStart{
        Voters[_addr].auth = true;
    }
    
    function Addcandidate(string calldata _name) external onlyOwner beforeElectionStart{
        candidates.push(candidate(_name,0));
        totalCandidates++;
    }


    // function to start voting
    function startVoting()external onlyOwner beforeElectionStart{
        startElection = true;
    }

    // funtion for voting (only registered voters can participate in voting)
    function vote(uint _num) external returns(bool){
        require(startElection == true,'Election has not started yet');
        require(Voters[msg.sender].auth,'Unauthorized voter');
        require(!Voters[msg.sender].voted,'already voted');
        candidates[_num].voteCount += 1;
        Voters[msg.sender].voted = true;
        Voters[msg.sender].vote += 1;
        totalVotes++;
        return true;
    }

    // function to end voting process
    function endVoting()external onlyOwner{
        require(startElection == true);
        endElection = true;
    }

}