import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

// Contract details from your App.jsx
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "CreditsMinted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "ProjectRegistered", "type": "event" }, { "inputs": [], "name": "admin", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_creditAmount", "type": "uint256" } ], "name": "approveAndMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "carbonCredits", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "projectCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "projects", "outputs": [ { "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "string", "name": "projectName", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "address", "name": "projectOwner", "type": "address" }, { "internalType": "string", "name": "dataHash", "type": "string" }, { "internalType": "bool", "name": "isApproved", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_location", "type": "string" }, { "internalType": "string", "name": "_dataHash", "type": "string" } ], "name": "registerProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function AdminPage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false initially
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

        setWalletAddress(address);
        setContract(contractInstance);
      } catch (err) {
        console.error("Error connecting wallet:", err);
        setError("Could not connect to wallet. Please try again.");
        setLoading(false);
      }
    } else {
      setError("Please install MetaMask to use this application.");
    }
  };

  const fetchProjects = useCallback(async () => {
    if (!contract) return;
    setLoading(true);
    setError(null);
    try {
      const count = await contract.projectCount();
      const projectsArray = [];
      for (let i = 1; i <= Number(count); i++) {
        const p = await contract.projects(i);
        projectsArray.push(p);
      }
      setProjects(projectsArray.reverse()); // Show newest projects first
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError('Could not fetch projects from the blockchain.');
    } finally {
      setLoading(false);
    }
  }, [contract]);

  // This useEffect now only runs when the contract instance is available
  useEffect(() => {
    if (contract) {
      fetchProjects();
    }
  }, [contract, fetchProjects]);

  const handleApprove = async (project) => {
    if (!contract) {
      alert("Please connect your wallet first.");
      return false;
    }

    const contractAdmin = await contract.admin();
    if (walletAddress.toLowerCase() !== contractAdmin.toLowerCase()) {
      alert("Error: Only the contract admin can approve projects.");
      return false;
    }

    // Placeholder for credit amount.
    // In a real app, you might have an input field for this.
    const creditAmount = 100;

    try {
      const tx = await contract.approveAndMint(project.projectId, creditAmount);
      alert(`Approving transaction... Please wait for confirmation. Tx hash: ${tx.hash}`);
      await tx.wait();
      alert(`Success! Project ${project.projectName} approved on the blockchain.`);
      fetchProjects(); // Re-fetch projects to update the UI
      return true;

    } catch (err) {
      console.error("Error approving project:", err);
      alert('Failed to approve project. Check the console for details.');
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
         {walletAddress ? (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-semibold">
                Admin Wallet Connected: {walletAddress}
            </div>
         ) : (
          <div className="bg-blue-100 border border-blue-200 text-blue-800 p-4 rounded-lg text-center">
            <h3 className="font-bold mb-2">Admin Action Required</h3>
            <p className="mb-4">Please connect your wallet to view and approve projects.</p>
            <button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Connect Admin Wallet
            </button>
          </div>
        )}
      </div>
      <AdminDashboard
        projects={projects}
        loading={loading}
        error={error}
        onApproveProject={handleApprove}
      />
    </div>
  );
}

export default AdminPage;