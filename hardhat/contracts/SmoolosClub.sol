// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./NFTCollection.sol";

contract SmoolosClub {
    using SafeMath for uint256;

    NFTCollection private smoolos;

    address public owner;

    mapping(address => uint256) public balances;
    address[] public accounts;

    constructor(address _address) {
        owner = msg.sender;
        smoolos = NFTCollection(_address);
    }

    modifier onlyNFTOwner {
        require(smoolos.balanceOf(msg.sender) > 0, "You must have a smoolos");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only Owner");
        _;
    }

    function deposit() onlyNFTOwner public payable {
        require(balances[msg.sender] == 0, "You already");
        require(msg.value > 0 wei, "You need input than 0");
        require(msg.value == getBalance().div(accounts.length + 1));

        if(balances[msg.sender] == 0) {
            accounts.push(msg.sender);
        }

        balances[msg.sender] += balances[msg.sender].add(msg.value);
    }

    function withdraw() onlyOwner public payable {
        for(uint i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            
            payable(accounts[i]).transfer(balances[account]);

            balances[account] = 0;

            delete accounts[i];
        }
    }

    function totalSupply() public view returns(uint256)  {
        return smoolos.totalSupply();
    }

    function getBalance() public view returns(uint256)  {
        return address(this).balance;
    }

    function getBalanceOf() public view returns(uint256)  {
        return smoolos.balanceOf(msg.sender);
    }

    function getBalancePerAccount() public view returns(uint256)  {
        if(address(this).balance == 0){
            return 0;
        } else {
            return address(this).balance.div(accounts.length);
        }
    }

    function getTotalAccounts() external view returns(uint256)  {
        return accounts.length;
    }
}