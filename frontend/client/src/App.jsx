import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import {
  BrowserRouter ,
  Route ,
  Routes,
} from "react-router-dom";
import Landing from './Landing';
import AdminPage from './AdminPage'; // Import the new AdminPage

// --- PASTE YOUR CONTRACT ADDRESS AND ABI HERE ---
const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"; // Use your deployed address
const contractABI = [
  // The same ABI from before
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "CreditsMinted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "ProjectRegistered", "type": "event" }, { "inputs": [], "name": "admin", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_creditAmount", "type": "uint256" } ], "name": "approveAndMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "carbonCredits", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "projectCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "projects", "outputs": [ { "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "string", "name": "projectName", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "address", "name": "projectOwner", "type": "address" }, { "internalType": "string", "name": "dataHash", "type": "string" }, { "internalType": "bool", "name": "isApproved", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_location", "type": "string" }, { "internalType": "string", "name": "_dataHash", "type": "string" } ], "name": "registerProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [projects, setProjects] = useState([]);
  const [creditBalance, setCreditBalance] = useState(0);
  const [formInput, setFormInput] = useState({ name: '', location: '', hash: '' });

  // New state variables for better UI feedback
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

        setWalletAddress(address);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setMessage('Error: Could not connect to wallet.');
      }
    } else {
      setMessage("Please install MetaMask to use this application.");
    }
  };

  // Using useCallback to prevent re-creation of this function on every render
  const fetchProjects = useCallback(async () => {
    if (!contract) return;
    try {
      const count = await contract.projectCount();
      const projectsArray = [];
      for (let i = 1; i <= Number(count); i++) {
        const p = await contract.projects(i);
        projectsArray.push(p);
      }
      setProjects(projectsArray.reverse()); // Show newest projects first
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
      // The event listener below will handle the success message and data refresh
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage('Error: Registration failed. Please try again.');
      setIsMining(false);
    }
  };

  // This useEffect hook runs once when the component mounts and sets up listeners
  useEffect(() => {
    if (contract) {
      // Fetch initial data
      fetchProjects();

      // Listen for the ProjectRegistered event
      const onProjectRegistered = (id, name, owner) => {
        console.log(`Event received: Project ${name} registered!`);
        setMessage(`Success! Project "${name}" has been registered.`);
        setIsMining(false);
        setFormInput({ name: '', location: '', hash: '' });
        fetchProjects(); // Refresh the project list
      };

      contract.on('ProjectRegistered', onProjectRegistered);

      // Cleanup function to remove the listener when the component unmounts
      return () => {
        contract.off('ProjectRegistered', onProjectRegistered);
      };
    }
  }, [contract, fetchProjects]);

  return (

<BrowserRouter>

<Routes>
<Route path="/block" element={
  <div>
    <>
      <header>
        <h1>Blue Carbon Registry</h1>
        {walletAddress ? (
          <div className="wallet-info">
            Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
          </div>
        ) : (
          <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
        )}
      </header>
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
    </>
    </div>
}/>



<Route path="/" element={<Landing/>}/>
<Route path="/admin" element={<AdminPage />} />
</Routes>

    </BrowserRouter>
  );

}

export default App;