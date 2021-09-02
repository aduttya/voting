const Voting = artifacts.require('./Voting');

contract('Testing', (accounts)=>{

    let voting;
    it('deployement of voting',async()=>{
        voting = await Voting.deployed();
        console.log("deployed address is : %s",voting.address)
    })
    it('adding candidates',async()=>{
        await voting.Addcandidate('Ajay',{from:accounts[0]})

        await voting.Addcandidate('Aditya',{from:accounts[0]})
        
        await voting.Addcandidate('Aman',{from:accounts[0]})
        

    })
    it('checking candidates',async ()=>{
        await voting.candidates(0).then(function(results){
            console.log(results[0],results[1].toString())
        })
    })
    it('adding voters',async()=>{
        await voting.Addvoter(accounts[4],{from:accounts[0]})
        
        await voting.Addvoter(accounts[5],{from:accounts[0]})
        
        await voting.Addvoter(accounts[6],{from:accounts[0]})
        await voting.Addvoter(accounts[7],{from:accounts[0]})
        

        await voting.Addvoter(accounts[8],{from:accounts[0]})
        
    })

    it('voting',async ()=>{
        await voting.vote(1,{from : accounts[4]})

        await voting.vote(1,{from : accounts[5]})

        await voting.vote(0,{from : accounts[6]})

        await voting.vote(1,{from : accounts[7]})

        await voting.vote(2,{from:accounts[8]})
        
        
    })

    

    it('printing votes of all candidates',async()=>{
        let length = await voting.totalCandidates()
        for(let i = 0; i < length; ++i){
            await voting.candidates(i).then(function(results){
                console.log(results[0]," ",results[1].toString())
            })
        }
    })



})
