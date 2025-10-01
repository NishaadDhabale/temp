import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Landing from './Landing';
import Marketplace from './components/Marketplace';
import ProjectDetails from './ProjectDetails';
import AdminDashboard from './components/AdminDashboard'; // CORRECT: Points to the new dashboard
import Navbar from './components/Navbar';
import { contractAddress, contractABI } from './constants';
import SignIn from './Signin';
import SignInN from './SigninN';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [projects, setProjects] = useState([]);
  const [formInput, setFormInput] = useState({ name: '', location: '', hash: '' });
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

  const fetchProjects = useCallback(async () => {
    if (!contract) return;
    try {
      const allProjects = await contract.getAllProjects();
      setProjects([...allProjects].reverse());
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
      <Navbar walletAddress={walletAddress} connectWallet={connectWallet} />
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signinn" element={<SignInN/>} />
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/project/:listingId" element={<ProjectDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/block" element={
          <main className="container">
            <div className="card">
              <h2>Register New Project</h2>
              <p>Onboard a new mangrove or seagrass restoration project to the registry.</p>
              <input type="text" placeholder="Project Name (e.g., Sundarbans Delta Restoration)" value={formInput.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} disabled={isMining} />
              <input type="text" placeholder="Location (e.g., West Bengal, India)" value={formInput.location} onChange={(e) => setFormInput({ ...formInput, location: e.target.value })} disabled={isMining} />
              <input type="text" placeholder="Initial Data Hash (from IPFS)" value={formInput.hash} onChange={(e) => setFormInput({ ...formInput, hash: e.target.value })} disabled={isMining} />
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