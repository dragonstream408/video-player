var Streaming = artifacts.require('./Streaming.sol');

contract('Streaming', function(accounts){

    it("...should send 1 ether from account 1 to 2", function() {
        var accountOne = accounts[0];
        var accountTwo = accounts[1];
        var accountTwoInitialBalance = web3.toBigNumber(web3.eth.getBalance(accountTwo).toString());

        var streamingInstance;

        return Streaming.deployed().then(function(instance) {
            streamingInstance = instance;
            return streamingInstance.bill(accountTwo, {from: accountOne, value: 1000000000000000000});
        }).then(function(result){
            var accountTwoFinalBalance = web3.toBigNumber(web3.eth.getBalance(accountTwo).toString());
            assert.isTrue(accountTwoFinalBalance.toString(10) === accountTwoInitialBalance.plus(1000000000000000000).toString(), "Final balance is expected value");
            return;
        });
    });
});