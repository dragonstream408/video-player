var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Streaming = artifacts.require("./Streaming.sol");

module.exports = function(deployer) {
  deployer.deploy(Streaming);

};
