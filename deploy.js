const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./compile');

// this module connects to target network and unlock account on that network
const provider = new HDWalletProvider(
    'execute ring ask afford envelope extra artwork misery wish reveal because stomach',
    'https://rinkeby.infura.io/62rPsl7I1ZKNPXHpccl9'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hi there!'] })
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
};
deploy(); 