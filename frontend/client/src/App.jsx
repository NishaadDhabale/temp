import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import Landing from './Landing';
import Marketplace from './Marketplace'; // Assuming you created this file
import ProjectDetails from './ProjectDetails'; // Assuming you created this file
import NCCRAdmin from './NCCRAdmin'; // Assuming you created this file

// --- PASTE YOUR FULL CONTRACT ABI HERE ---
// This should be the ABI from your *new* updated smart contract
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

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [projects, setProjects] = useState([]);
  const [creditBalance, setCreditBalance] = useState(0);
  const [formInput, setFormInput] = useState({ name: '', location: '', hash: '' });
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log("MetaMask is installed!"); // Add this line for debugging
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); // This line should trigger MetaMask
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

        setWalletAddress(address);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setMessage('Error: Could not connect to wallet.');
      }
    } else {
      console.log("MetaMask is not installed."); // Add this for debugging
      setMessage("Please install MetaMask to use this application.");
    }
};

  const fetchProjects = useCallback(async () => {
    if (!contract) return;
    try {
      const allProjects = await contract.getAllProjects();
      setProjects([...allProjects].reverse()); // Show newest projects first
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage('Error: Could not fetch projects.');
    }
  }, [contract]);

  const handleRegister = async () => {
    if (!contract) return setMessage("Please connect wallet first");
    setMessage('');
    setIsMining(true);

    try {
      const tx = await contract.registerProject(formInput.name, formInput.location, formInput.hash);
      await tx.wait();
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage('Error: Registration failed. Please try again.');
      setIsMining(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchProjects();

      const onProjectRegistered = (id, name, owner) => {
        console.log(`Event received: Project ${name} registered!`);
        setMessage(`Success! Project "${name}" has been registered.`);
        setIsMining(false);
        setFormInput({ name: '', location: '', hash: '' });
        fetchProjects();
      };

      contract.on('ProjectRegistered', onProjectRegistered);

      return () => {
        contract.off('ProjectRegistered', onProjectRegistered);
      };
    }
  }, [contract, fetchProjects]);

  return (
    <BrowserRouter>
      <header>
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">BlueCarbon</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/marketplace" className="text-gray-600 hover:text-blue-600 px-3 py-2">Marketplace</Link>
                    <Link to="/block" className="text-gray-600 hover:text-blue-600 px-3 py-2">Register Project</Link>
                    <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2">NCCR Admin</Link>
                    {walletAddress ? (
                      <div className="wallet-info">
                        Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
                      </div>
                    ) : (
                      <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
                    )}
                </div>
            </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/project/:listingId" element={<ProjectDetails />} />
        <Route path="/admin" element={<NCCRAdmin />} />

        {/* This is your original project registration UI */}
        <Route path="/block" element={
          <main className="container">
            <div className="card">
              <h2>Register New Project</h2>
              <p>Onboard a new mangrove or seagrass restoration project to the registry.</p>
              <input
                type="text"
                placeholder="Project Name (e.g., Sundarbans Delta Restoration)"
                value={formInput.name}
                onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                disabled={isMining}
              />
              <input
                type="text"
                placeholder="Location (e.g., West Bengal, India)"
                value={formInput.location}
                onChange={(e) => setFormInput({ ...formInput, location: e.target.value })}
                disabled={isMining}
              />
              <input
                type="text"
                placeholder="Initial Data Hash (from IPFS)"
                value={formInput.hash}
                onChange={(e) => setFormInput({ ...formInput, hash: e.target.value })}
                disabled={isMining}
              />
              <button onClick={handleRegister} disabled={isMining}>
                {isMining ? 'Registering...' : 'Register Project'}
              </button>
              {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
            </div>

            <div className="card">
              <h2>Registered Projects</h2>
              <div className="project-list">
                {projects.length > 0 ? projects.map((p) => (
                  <div className="project-item" key={Number(p.projectId)}>
                    <h3>{p.projectName}</h3>
                    <p><strong>Location:</strong> {p.location}</p>
                    <p><strong>Owner:</strong> {p.projectOwner}</p>
                    <p><strong>Status:</strong> {p.isApproved ? 'Approved' : 'Pending Approval'}</p>
                  </div>
                )) : <p>No projects registered yet.</p>}
              </div>
            </div>
          </main>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;