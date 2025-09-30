import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import { supabase } from './lib/supabase';

// Contract details from your App.jsx
const contractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
const contractABI = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "CreditsMinted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "ProjectRegistered", "type": "event" }, { "inputs": [], "name": "admin", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_projectId", "type": "uint256" }, { "internalType": "uint256", "name": "_creditAmount", "type": "uint256" } ], "name": "approveAndMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "carbonCredits", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "projectCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "projects", "outputs": [ { "internalType": "uint256", "name": "projectId", "type": "uint256" }, { "internalType": "string", "name": "projectName", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "address", "name": "projectOwner", "type": "address" }, { "internalType": "string", "name": "dataHash", "type": "string" }, { "internalType": "bool", "name": "isApproved", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_location", "type": "string" }, { "internalType": "string", "name": "_dataHash", "type": "string" } ], "name": "registerProject", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function AdminPage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

        setWalletAddress(address);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert('Error: Could not connect to wallet.');
      }
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  const handleApprove = async (project) => {
    if (!contract) {
      alert("Please connect your wallet first.");
      return;
    }

    // Check if the connected user is the admin
    const contractAdmin = await contract.admin();
    if(walletAddress.toLowerCase() !== contractAdmin.toLowerCase()){
      alert("Error: Only the contract admin can approve projects.");
      return false;
    }

    try {
      // 1. Call the smart contract function
      const tx = await contract.approveAndMint(project.project_id, project.estimated_carbon_credits);
      alert(`Approving transaction... Tx hash: ${tx.hash}`);
      await tx.wait();
      alert(`Success! Project ${project.project_name} approved on the blockchain.`);

      // 2. Update the status in Supabase
      const { error } = await supabase
        .from('projects')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: walletAddress
        })
        .eq('id', project.id);

      if (error) throw error;

      // The dashboard will refetch data automatically after this
      return true;

    } catch (err) {
      console.error("Error approving project:", err);
      alert('Failed to approve project. Check console for details.');
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
         {walletAddress ? (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-semibold">
            Admin Wallet Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center">
            <button onClick={connectWallet} className="font-bold underline">
              Connect Admin Wallet to Approve/Reject
            </button>
          </div>
        )}
      </div>
      <AdminDashboard onApproveProject={handleApprove} />
    </div>
  );
}

export default AdminPage;