import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Use your deployed address
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "listingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "projectId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "CreditsListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "CreditsMinted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "listingId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalCost",
          "type": "uint256"
        }
      ],
      "name": "CreditsSold",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ProjectRegistered",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_projectId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_creditAmount",
          "type": "uint256"
        }
      ],
      "name": "approveAndMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_listingId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "buyCredits",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "carbonCredits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getActiveListings",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "listingId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "projectId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct BlueCarbonRegistry.Listing[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllProjects",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "projectId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "projectName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "projectOwner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "dataHash",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isApproved",
              "type": "bool"
            }
          ],
          "internalType": "struct BlueCarbonRegistry.Project[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_projectId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_pricePerCredit",
          "type": "uint256"
        }
      ],
      "name": "listCreditsForSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "listingCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listings",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "listingId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "projectId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "projectCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "projects",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "projectId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "projectName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "projectOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "dataHash",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isApproved",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dataHash",
          "type": "string"
        }
      ],
      "name": "registerProject",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const ProjectDetails = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [project, setProject] = useState(null);
    const [amount, setAmount] = useState(1);
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const connectToBlockchain = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                    setContract(contractInstance);
                } catch (error) {
                    console.error("Error connecting to blockchain:", error);
                }
            }
        };
        connectToBlockchain();
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            if (contract && listingId) {
                try {
                    const listingDetails = await contract.listings(listingId);
                    const projectDetails = await contract.projects(listingDetails.projectId);
                    setListing(listingDetails);
                    setProject(projectDetails);
                } catch (error) {
                    console.error("Error fetching details:", error);
                }
            }
        };
        fetchDetails();
    }, [contract, listingId]);

    const handleBuy = async () => {
        if (!contract || !listing) return;
        setMessage('');

        try {
            const totalCost = BigInt(amount) * listing.price;
            const tx = await contract.buyCredits(listingId, amount, { value: totalCost });
            await tx.wait();
            setMessage('Purchase successful!');
        } catch (error) {
            console.error("Purchase failed:", error);
            setMessage('Purchase failed. Please try again.');
        }
    };
    if (!listing || !project) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="card">
                <h1 className="text-3xl font-bold">{project.projectName}</h1>
                <p><strong>Location:</strong> {project.location}</p>
                <p><strong>Owner:</strong> {project.projectOwner}</p>
                <p><strong>Data Hash:</strong> {project.dataHash}</p>
                <hr className="my-4" />
                <h2 className="text-2xl font-bold">Buy Carbon Credits</h2>
                <p><strong>Credits Available:</strong> {Number(listing.amount)}</p>
                <p><strong>Price per Credit:</strong> {ethers.formatEther(listing.price)} ETH</p>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    max={Number(listing.amount)}
                />
                <button onClick={handleBuy}>
                    Buy {amount} Credits for {ethers.formatEther(BigInt(amount) * listing.price)} ETH
                </button>
                {message && <p className="message success mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ProjectDetails;