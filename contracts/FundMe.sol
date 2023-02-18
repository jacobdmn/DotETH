// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

error NotOwner();

contract FundMe {

    uint256 internal constant USD_PRICE = 1000 wei;
    uint256 internal constant MIN_USD_TO_SEND = 100; // get this from Chainlink oracle
    uint256 internal constant MIN_WEI_TO_SEND = MIN_USD_TO_SEND * USD_PRICE;

    address payable public immutable owner;

    struct Funder {
        address funderAddress;
        uint256 fundValue;
    }

    Funder[] public funders;

    // onlyOwner modifier
    modifier onlyOwner() {
        if(payable(msg.sender) != owner) {
            revert NotOwner();
        }
        // require(msg.sender == owner);
        _;
    }

    // isEnoughPayable modifier
    modifier isEnoughPayable () {
        require(msg.value >= MIN_WEI_TO_SEND, "Min amount is 100k wei");
        _;
    }

    // constructor function
    constructor(){
        owner = payable(msg.sender);
    }

    // fund function
    function fund() public payable isEnoughPayable {
        funders.push(Funder(
            {
                funderAddress: msg.sender,
                fundValue: msg.value
            }
        ));
    }

    // receive function
    receive() external payable {
        fund();
    }

    // fallback function
    fallback() external payable {
        fund();
    }

    // withdraw function
    function withdraw() public onlyOwner {
        // funders = new Funder[](0);
        owner.transfer(address(this).balance);
    }

    // get balance function
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}
