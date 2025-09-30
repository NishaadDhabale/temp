import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const Admin = ({ contract, walletAddress }) => {
  const [projects, setProjects] = useState([]);
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState('');
  const [creditAmounts, setCreditAmounts] = useState({});
  const [creditBalances, setCreditBalances] = useState({});

  const fetchProjects = useCallback(async () => {
    if (!contract) return;
    try {
      const count = await contract.projectCount();
      const projectsArray = [];
      const balances = {};
      for (let i = 1; i <= Number(count); i++) {
        const p = await contract.projects(i);
        projectsArray.push(p);
        if (!balances[p.projectOwner]) {
          const balance = await contract.carbonCredits(p.projectOwner);
          balances[p.projectOwner] = ethers.formatUnits(balance, 18);
        }
      }
      setProjects(projectsArray.reverse()); // Show newest projects first
      setCreditBalances(balances);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage('Error: Could not fetch projects.');
    }
  }, [contract]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleApproveAndMint = async (projectId) => {
    if (!contract) return setMessage("Please connect wallet first");
    const creditAmount = creditAmounts[projectId];
    if (!creditAmount || isNaN(creditAmount) || Number(creditAmount) <= 0) {
      return setMessage('Please enter a valid credit amount.');
    }

    setMessage('');
    setIsMining(true);

    try {
      const tx = await contract.approveAndMint(projectId, ethers.parseUnits(creditAmount, 18));
      await tx.wait();
      setMessage(`Success! Project ID: ${projectId} has been approved and credits minted.`);
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Approval and minting failed:", error);
      setMessage('Error: Approval and minting failed. Please try again.');
    } finally {
      setIsMining(false);
    }
  };

  const handleCreditAmountChange = (projectId, amount) => {
    setCreditAmounts(prev => ({ ...prev, [projectId]: amount }));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Panel - Project Approval</h2>
        {message && <p className={`message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
        <div className="project-list">
          {projects.length > 0 ? projects.map((p) => (
            <div className="project-item" key={Number(p.projectId)}>
              <h3>{p.projectName}</h3>
              <p><strong>ID:</strong> {Number(p.projectId)}</p>
              <p><strong>Location:</strong> {p.location}</p>
              <p><strong>Owner:</strong> {p.projectOwner}</p>
              <p><strong>Owner's Balance:</strong> {creditBalances[p.projectOwner] || 0} Credits</p>
              <p><strong>Status:</strong> {p.isApproved ? <span style={{ color: 'green' }}>Approved</span> : <span style={{ color: 'orange' }}>Pending Approval</span>}</p>
              {!p.isApproved && (
                <div>
                  <input
                    type="number"
                    placeholder="Credits to Mint (in ETH)"
                    value={creditAmounts[Number(p.projectId)] || ''}
                    onChange={(e) => handleCreditAmountChange(Number(p.projectId), e.target.value)}
                    disabled={isMining}
                  />
                  <button onClick={() => handleApproveAndMint(Number(p.projectId))} disabled={isMining}>
                    {isMining ? 'Processing...' : 'Approve & Mint Credits'}
                  </button>
                </div>
              )}
            </div>
          )) : <p>No projects registered yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;