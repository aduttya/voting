// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Voting{

    struct Voter{
        bool auth;
        bool voted;
        uint256 vote;
    }
    uint public totalCandidates;
    uint electionStartingTime;
    struct candidate{
        string name;
        uint256 voteCount;
    }

    mapping(address => Voter) public Voters;
    candidate [] public candidates;
    address public admin;
    constructor() public{
        admin = msg.sender;
        totalCandidates = 0;
        electionStartingTime = block.timestamp;
    }
    modifier onlyOwner{
        require(msg.sender == admin,'for this operation only admin has previlages');
        _;
    }

    function Addvoter(address _addr)external onlyOwner{
        Voters[_addr].auth = true;
    }

    function Addcandidate(string calldata _name) external onlyOwner{
        candidates.push(candidate(_name,0));
        totalCandidates++;
    }

    function vote(uint _num) external returns(bool){
        require(Voters[msg.sender].auth);
        require(!Voters[msg.sender].voted);
        candidates[_num].voteCount += 1;
        Voters[msg.sender].voted = true;
        return true;
    }

}