// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol"; // For debugging

contract BlueCarbonRegistry {
    address public admin; // The person who deploys the contract

    struct Project {
        uint projectId;
        string projectName;
        string location;
        address projectOwner; // NGO's wallet address
        string dataHash; // We will just pretend to put a hash here
        bool isApproved;
    }

    struct Listing {
        uint listingId;
        uint projectId;
        address seller;
        uint amount;
        uint price; // Price per credit in wei
        bool active;
    }

    uint public projectCount;
    uint public listingCount;

    mapping(uint => Project) public projects; // Maps a project ID to its details
    mapping(address => uint) public carbonCredits; // Maps an address to its credit balance
    mapping(uint => Listing) public listings; // Maps a listing ID to its details

    event ProjectRegistered(uint id, string name, address owner);
    event CreditsMinted(address to, uint amount);
    event CreditsListed(uint listingId, uint projectId, address seller, uint amount, uint price);
    event CreditsSold(uint listingId, address buyer, uint amount, uint totalCost);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    function registerProject(string memory _name, string memory _location, string memory _dataHash) public {
        projectCount++;
        projects[projectCount] = Project(
            projectCount,
            _name,
            _location,
            msg.sender, // The caller of the function is the owner
            _dataHash,
            false // Projects start as unapproved
        );
        emit ProjectRegistered(projectCount, _name, msg.sender);
    }

    function approveAndMint(uint _projectId, uint _creditAmount) public onlyAdmin {
        require(_projectId > 0 && _projectId <= projectCount, "Project does not exist.");
        Project storage projectToApprove = projects[_projectId];
        require(!projectToApprove.isApproved, "Project already approved.");

        projectToApprove.isApproved = true;
        carbonCredits[projectToApprove.projectOwner] += _creditAmount;

        emit CreditsMinted(projectToApprove.projectOwner, _creditAmount);
    }

    function listCreditsForSale(uint _projectId, uint _amount, uint _pricePerCredit) public {
        require(projects[_projectId].projectOwner == msg.sender, "You are not the owner of this project.");
        require(carbonCredits[msg.sender] >= _amount, "Insufficient credit balance.");

        carbonCredits[msg.sender] -= _amount;
        listingCount++;

        listings[listingCount] = Listing(
            listingCount,
            _projectId,
            msg.sender,
            _amount,
            _pricePerCredit,
            true
        );

        emit CreditsListed(listingCount, _projectId, msg.sender, _amount, _pricePerCredit);
    }

    function buyCredits(uint _listingId, uint _amount) public payable {
        require(_listingId > 0 && _listingId <= listingCount, "Listing does not exist.");
        Listing storage listing = listings[_listingId];
        require(listing.active, "This listing is no longer active.");
        require(listing.amount >= _amount, "Not enough credits in the listing for this purchase.");

        uint totalCost = _amount * listing.price;
        require(msg.value >= totalCost, "Not enough Ether sent for this purchase.");

        // Update listing
        listing.amount -= _amount;
        if (listing.amount == 0) {
            listing.active = false;
        }

        // Transfer credits to buyer
        carbonCredits[msg.sender] += _amount;

        // Transfer funds to seller
        payable(listing.seller).transfer(totalCost);

        // Refund any excess Ether
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }

        emit CreditsSold(_listingId, msg.sender, _amount, totalCost);
    }

    // Function to get all projects - useful for the frontend
    function getAllProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectCount);
        for (uint i = 0; i < projectCount; i++) {
            allProjects[i] = projects[i + 1];
        }
        return allProjects;
    }

    // Function to get all active listings - useful for the marketplace
    function getActiveListings() public view returns (Listing[] memory) {
        uint activeCount = 0;
        for (uint i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeCount++;
            }
        }

        Listing[] memory activeListings = new Listing[](activeCount);
        uint counter = 0;
        for (uint i = 1; i <= listingCount; i++) {
            if (listings[i].active) {
                activeListings[counter] = listings[i];
                counter++;
            }
        }
        return activeListings;
    }
}