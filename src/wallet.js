import ProviderEngine from 'web3-provider-engine'; 
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js'; 
import FixtureSubprovider from 'web3-provider-engine/subproviders/fixture.js'; 
import FilterSubprovider from 'web3-provider-engine/subproviders/filters.js';  
import VmSubprovider from 'web3-provider-engine/subproviders/vm.js';   
import NonceSubprovider from 'web3-provider-engine/subproviders/nonce-tracker.js'; 
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc.js'; 

//EthereumJS Wallet Sub-Provider

import WalletSubprovider from 'ethereumjs-wallet/provider-engine';
import walletFactory from 'ethereumjs-wallet';

//Web3 Module

import Web3 from 'web3';

//Wallet Initialization

var privateKey = "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
var privateKeyBuffer = new Buffer(privateKey, "hex")
var myWallet = walletFactory.fromPrivateKey(privateKeyBuffer)

//Engine initialization & sub-provider attachment

var engine = new ProviderEngine();

engine.addProvider(new FixtureSubprovider({
  web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
  net_listening: true,
  eth_hashrate: '0x00',
  eth_mining: false,
  eth_syncing: true,
}))

// cache layer
engine.addProvider(new CacheSubprovider())

// filters
engine.addProvider(new FilterSubprovider())

// pending nonce
engine.addProvider(new NonceSubprovider())

// vm
engine.addProvider(new VmSubprovider())

// Here the URL can be your localhost for TestRPC or the Infura URL
engine.addProvider(new RpcSubprovider({
  rpcUrl: 'http://localhost:7545',
}))

// Wallet Attachment
engine.addProvider(new WalletSubprovider(myWallet))

// network connectivity error
engine.on('error', function(err){
  // report connectivity errors
  console.error(err.stack)
})

// start polling for blocks
engine.start()

//Actual Initialization of the web3 module

// var web3 = new Web3(engine)

export default new Web3(engine);    
