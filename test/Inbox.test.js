const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
 
const provider = ganache.provider();
const web3 = new Web3(provider);
//rinkeyby provider or other providers

const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all accounts

  accounts = await web3.eth.getAccounts()

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments:['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })

    inbox.setProvider(provider);
  //use one of those accounts to deploy contarct
})

describe('should list accounts', () => {
  it('deploys a contract', () => {
    //this inbox corresponds to the contract deployed on the block chain
    //methods on this object we can intereact with
    //options.address is the address the contract now exists at
    console.log('inbox', inbox);
    //ok means a value exists
    assert.ok(inbox.options.address);

  })

  it('has a default message', async () => {
    //first one is method, any arguments this might require
    //second one is call() used to customize transaction sent out to network/ who will pay? how much gas to use
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
})

// class Car {
//   park() {
//     return 'stopped';
//   }
//
//   drive() {
//     return 'vroom';
//   }
// }
//
// let car
//
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car', () => {
//   it('should stop', () => {
//     assert.equal(car.park(), 'stopped')
//   })
//
//   it('should GOO', () => {
//     assert.equal(car.drive(), 'vroom')
//   })
// })
