// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Voting{
    uint public totalCondidates;
    address public owner;

    constructor()public{
        owner = msg.sender;
        totalCondidates = 0;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }


    mapping(uint256 => address) candidates;
    mapping (address=>uint256) candidatesVote;
    mapping(address => bool) voted;
    mapping(address=>bool) IsCandidate;
    mapping(address=>bool) IsVoter;

    function addCandidate(address _addr) onlyOwner external payable returns(bool){
        totalCondidates++;
        candidates[totalCondidates] = _addr;
        candidatesVote[candidates[totalCondidates]] = 1;
        IsCandidate[_addr] = true;
        return true;
    }

    function addVoter(address _addr) onlyOwner external payable returns(bool){
            voted[_addr] = false;
            IsVoter[_addr] = true;
            return true;
        }
}

contract Ballot is Voting{

    function vote(uint _num)external returns(bool){
        require(IsVoter[msg.sender] == true,'voter must be registered');
        require(voted[msg.sender] == false,'already voted');
        require(IsCandidate[candidates[_num]] == true,'Not a valid candidate');
        candidatesVote[candidates[_num]]++;
        voted[msg.sender] = true;
        return true;


    }

}
