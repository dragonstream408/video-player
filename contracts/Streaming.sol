pragma solidity ^0.4.2;

contract Streaming {

    function bill(address streamer) public payable returns(bool){
        if (msg.value > 0) {
            if (!streamer.send(msg.value)) {
                return false;
            }
            return true;
        }
    }

    function() public payable { }
}