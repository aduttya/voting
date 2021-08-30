const Ballot = artifacts.require('./Voting');

module.exports = function(deployer){
    deployer.deploy(Ballot);
}