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

    it('adding voters',async()=>{
        await voting.Addvoter(accounts[4],{from:accounts[0]})
        
        await voting.Addvoter(accounts[5],{from:accounts[0]})
        
        await voting.Addvoter(accounts[6],{from:accounts[0]})

        await voting.Addvoter(accounts[2],{from:accounts[0]})

        await voting.Addvoter(accounts[1],{from:accounts[0]})

    })

    it('adding candidate and voter using other accounts',async()=>{
        await voting.Addcandidate('shiva',{from:accounts[1]})
        await voting.Addvoter(accounts[7],{from:accounts[7]})
    })

    it('vote before election had started',async()=>{
        await voting.vote(1,{from:accounts[2]})
    })

    it('calling end function before election is started',async()=>{
        await voting.endVoting()
    })

    it('startvoting',async()=>{
        await voting.startVoting()
    })

    it('adding a candidate after voting has started',async()=>{
        await voting.Addcandidate('ankur',{from: accounts[0]})
    })
    it('checking candidates',async ()=>{
        await voting.candidates(0).then(function(results){
            console.log(results[0],results[1].toString())
        })
    })

    it('voting',async ()=>{
        await voting.vote(1,{from : accounts[4]})

        await voting.vote(1,{from : accounts[5]})

        await voting.vote(0,{from : accounts[6]})

        await voting.vote(1,{from : accounts[7]})
    })

    
    it('end voting from other account',async ()=>{
        await voting.endVoting()
    })
    it('end voting from owner account',async()=>{
        await voting.endVoting()
    })

    it('try to vote after election has ended',async()=>{
        await voting.vote(1,{from:accounts[2]})
    })

    it('displaying votes',async ()=>{
        let len = await voting.totalCandidates()

        for(let i = 0; i < len; ++i){
            let winner = ""
            let winnerVote;
            await voting.candidates(i).then(function(results){
                if(results[1].toString() > winnerVote){
                    winner = results[0]
                    winnerVote = results[1].toString()
                }
                console.log(typeof results[1])
                console.log(results[0],results[1].toString())
            })
        }
    })

})
