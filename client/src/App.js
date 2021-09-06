import React, { Component ,useState} from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import { func } from "prop-types";

// create a react app
class App extends Component {

  // initializing the react states 
  constructor(props){
    super(props);
    this.state = {
      web3: null,
      addcandidate : "",
      addvoter : "",
      contract : null,
      index:null,
      address:'0x0'

    }

  }

  // it is the first function that will automatically be called

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)

      // Get the network instance 
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await Voting.networks[networkId];

      // getting contract instance
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );

      
       // console.log('the val of index is ',this.state.index)
      //  updating the states
      this.setState({ web3:web3, accounts, contract: instance ,address:deployedNetwork.address});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

// function to add candidates
Addcandidate = async()=>{

  const {addcandidate,web3,contract,accounts} = this.state;
  // if user types null string

    if(addcandidate != ""){
    console.log('add candidate function is called and name of the candidate is',addcandidate)

    // web3.js method to call the deployed function(contract is the object to access functions)
   await contract.methods.Addcandidate(addcandidate).send({
     from : accounts[0],
     gas : 800000
   })
   console.log('add voter function is terminated')}
   else{
     console.log('Empty name is not allowed')
   }


}

// getting total added candidates
totalCandidate = async()=>{
  console.log('total candidate function is called')

  // getting contract instance from react state 
  const {contract} = this.state

  // calling totoalCandidates method
  let len = await contract.methods.totalCandidates().call()

  // print total candidates with their votes
  for(let i = 0; i < len; ++i){
    await contract.methods.candidates(i).call().then(function(results){
      console.log('name of the candidate is ',results[0],"and he got",results[1].toString()," votes")

    })
  }
  console.log('total condidate function ended')

  
}

// function to add voters
Addingvoters = async ()=>{
  const{contract,accounts,addvoter,web3} = this.state
  console.log('adding voters function is called and voter address is',addvoter)
 
    // web3.js method to call the deployed function
    await contract.methods.Addvoter(addvoter).send({
    from:accounts[0],
    gas : 800000
  }).then( await contract.methods.Voters(addvoter).call().then(function(results){
    console.log(results)
  }))


}

// function to use vote function
voting = async ()=>{

  // getting react instances
  const{contract,accounts,index,address} = this.state
  console.log('voting function is called and the value of index is',index)

  // calling vote function
  await contract.methods.vote(index).send({
    from:accounts[0],
    to:address,
    gas:80000
  }).then(console.log('vote recorded sucessfully'))


}
// checks the state of a voter that he is voted or not
checkvotedPeople = async ()=>{
  const{contract,accounts,addvoter} = this.state
  console.log('the account address is ',this.addvoter)
  await contract.methods.Voters(this.state.addvoter).call()
  .then(function(results){
    console.log(results[0],results[1])
  })
}


  render() {

    // it loads first to check web3 provider(metamask in this case)
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <h1>Voting system</h1>

          {/* add candidate input box and button*/}
          <input type="text" placeholder = "enter the name of candidate"
          onChange = {(event)=>{this.setState({addcandidate:event.target.value})}}/>
          <button onClick = {()=>{this.Addcandidate()}} >
          Addingcandidates</button>
        <br/>
          {/* add voter input box and button*/}
          <input type="text" placeholder = "enter the address of voter"
          onChange = {(event)=>{this.setState({addvoter:event.target.value})}}/>
          <button onClick = {()=>{this.Addingvoters()}} >
          Addingvoters</button>
          <br/>

          {/* button for start voting*/}
          <input type="text" placeholder = "enter the index of the candidate"
          onChange = {(event)=>{this.setState({index:event.target.value})}}/>
          <button onClick = {()=>{this.voting()}} >
          Vote</button>
          <br/>

          {/*button to check voted people*/}
          <button onClick = {()=>{this.checkvotedPeople()}} >
          check</button>
          <br/>

          {/* button to check total candidates*/}
          <button onClick = {()=>{this.totalCandidate()}} >
          totalCandidates</button>

          <p>currently adding voter is <b>{this.state.addvoter}</b></p>
      </div>
    );
  }
}

export default App;
