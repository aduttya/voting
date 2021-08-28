const Voting = artifacts.require('./Ballot');

contract('Testing', (accounts)=>{

    let voting;
    it('deployement of voting',async()=>{
        voting = await Voting.deployed();
        console.log("deployed address is : %s",voting.address)
    })

    it('adding candidates',async()=>{
        await voting.addCandidate(accounts[1],{from:accounts[0]}).then(function(results){
            console.log('candidate added sucessfully ',results)
        })

        await voting.addCandidate(accounts[2],{from:accounts[0]}).then(function(results){
            console.log('candidate added sucessfully',results)
        })
        await voting.addCandidate(accounts[3],{from:accounts[0]}).then(function(results){
            console.log('candidate added sucessfully',results)
        })

        await voting.totalCondidates().then(function(results){
            console.log('total no of candidates are',results.toNumber())
        })
        

    })

    it('adding voters',async()=>{
        await voting.addVoter(accounts[4],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })
        await voting.addVoter(accounts[5],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })
        await voting.addVoter(accounts[6],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })

        await voting.addVoter(accounts[7],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })

        await voting.addVoter(accounts[8],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })

        await voting.addVoter(accounts[9],{from:accounts[0]}).then(function(results){
            console.log('Voter added sucessfully',results)
        })
    })
})