// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./NFTCollection.sol";

contract BettingClub is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    bool public isBetOpen = false;
    uint public minBetAmount = 1 ether;

    struct Bet {
        address account;
        string side;
        string game;
        uint amount;
        bool isActive;
        uint timestamp;
    }

    Bet[] public bets;

    event NewBet(address account, string side, string game, uint amount, uint timestamp);
    event BetWinner(string side, string game, uint amount, uint timestamp);

    NFTCollection private smoolos;

    constructor(address _address) {
        smoolos = NFTCollection(_address);
    }

    modifier onlyNFTOwner {
        require(smoolos.balanceOf(msg.sender) > 0, "You must have a smoolos");
        _;
    }

    function toggleBet() public onlyOwner {
        isBetOpen = !isBetOpen;
    }

    function bet(string memory _side, string memory _game) public payable nonReentrant onlyNFTOwner returns(bool) {
        require(isBetOpen, "Bets are closed");
        require(msg.value >= minBetAmount, "Min bet invalid");

        bets.push(Bet({ account: msg.sender, side: _side, game: _game, amount: msg.value, isActive: true, timestamp: block.timestamp }));

        emit NewBet(msg.sender, _side, _side, msg.value, block.timestamp);

        return true;
    }

    function setWinner(string memory _side, string memory _game) public payable onlyOwner returns(bool) {
        isBetOpen = false;

        (, uint totalAmount) = getTotalBetsBySide(_side, _game);
        
        uint totalBucket = getBucket();

        for(uint i = 0; i< bets.length ; i++) {
            if (keccak256(abi.encodePacked(bets[i].side)) == keccak256(abi.encodePacked(_side)) && keccak256(abi.encodePacked(bets[i].game)) == keccak256(abi.encodePacked(_game))) {
                require(bets[i].isActive, "Game is not active");
                
                uint accountPercentage = ((bets[i].amount / (10*18)) * 100) / (totalAmount / (10*18));

                uint earnings = (totalBucket * (accountPercentage) / 100);

                payable(address(bets[i].account)).transfer(earnings);

                emit BetWinner(_side, bets[i].game, earnings, block.timestamp);
            }

            if(keccak256(abi.encodePacked(bets[i].game)) == keccak256(abi.encodePacked(_game))) {
                bets[i].isActive = false;
            }
        }

        return true;
    }

    function setMinBetAmount(uint _value) public onlyOwner {
        minBetAmount = _value;
    }


    function getBucket() public view returns(uint) {
        return address(this).balance;
    }

    function getTotalBetsBySide(string memory _side, string memory _game) public view returns(uint totalWinners, uint totalAmount) {

        for(uint i = 0; i< bets.length ; i++){
            if (keccak256(abi.encodePacked(bets[i].side)) == keccak256(abi.encodePacked(_side)) && keccak256(abi.encodePacked(bets[i].game)) == keccak256(abi.encodePacked(_game))) {
                totalAmount += bets[i].amount;
                totalWinners += 1;
            }
        }

        return (totalWinners, totalAmount);
    }

    function withdraw() public payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}