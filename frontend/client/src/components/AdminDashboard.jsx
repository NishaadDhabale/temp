import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Filter, Search, AlertCircle } from 'lucide-react';
import ProjectCard from './ProjectCard';

// IMPORTANT: Replace with your deployed contract address and full ABI
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [/* YOUR_FULL_UPDATED_CONTRACT_ABI */];

export default function AdminDashboard() {
    const [allProjects, setAllProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [contract, setContract] = useState(null);

    const connectToContract = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
                return contractInstance;
            } catch (err) {
                setError("Could not connect to wallet. Please make sure MetaMask is installed and unlocked.");
                console.error(err);
                return null;
            }
        }
        setError("MetaMask is not installed.");
        return null;
    }, []);

    const fetchProjects = useCallback(async (contractInstance) => {
        const contractToUse = contractInstance || contract;
        if (!contractToUse) return;

        try {
            setLoading(true);
            setError(null);

            const projectsFromChain = await contractToUse.getAllProjects();

            // Map the data from the smart contract to the format your UI expects
            const formattedProjects = projectsFromChain.map(p => ({
                id: p.projectId.toString(), // For React key prop
                project_id: p.projectId.toString(),
                project_name: p.projectName,
                organization_name: `Owner: ${p.projectOwner.substring(0, 10)}...`,
                projectOwner: p.projectOwner, // Keep original for handlers
                projectId: p.projectId, // Keep original for handlers
                location: p.location,
                dataHash: p.dataHash,
                status: p.isApproved ? 'approved' : 'pending',
                // Add mock data for fields not in the smart contract
                organization_type: 'NGO',
                area_hectares: Math.floor(Math.random() * 500) + 50, // Mock data
                estimated_carbon_credits: Math.floor(Math.random() * 2000) + 500, // Mock data
                ecosystem_type: 'Mangrove Forest', // Mock data
                submitted_at: new Date().toISOString(), // Mock data, replace with real data if available
                reviewed_at: p.isApproved ? new Date().toISOString() : null, // Mock data
                reviewed_by: p.isApproved ? 'NCCR Admin' : null, // Mock data
            }));

            setAllProjects(formattedProjects);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch projects');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }, [contract]);

    useEffect(() => {
        connectToContract().then(contractInstance => {
            if (contractInstance) {
                fetchProjects(contractInstance);
            }
        });
    }, [connectToContract, fetchProjects]);

    useEffect(() => {
        let filtered = allProjects;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(p => p.status === statusFilter);
        }

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.project_id.toString().toLowerCase().includes(search) ||
                p.project_name.toLowerCase().includes(search) ||
                p.projectOwner.toLowerCase().includes(search)
            );
        }

        setFilteredProjects(filtered.sort((a, b) => b.id - a.id));
    }, [allProjects, statusFilter, searchTerm]);

    const handleApprove = async (projectId, creditsToMint) => {
        if (!contract) {
            alert('Please connect your wallet first.');
            return;
        }
        if (!creditsToMint || creditsToMint <= 0) {
            alert('Please enter a valid number of credits to mint.');
            return;
        }

        try {
            const tx = await contract.approveAndMint(projectId, creditsToMint);
            alert('Approving project... please wait for the transaction to complete.');
            await tx.wait();
            alert('Project approved successfully!');
            fetchProjects(); // Refresh projects from the blockchain
        } catch (err) {
            console.error('Error approving project:', err);
            alert('Failed to approve project. See console for details.');
        }
    };

    const handleReject = (id) => {
        // This is a UI-only action since the contract doesn't have a reject function.
        console.log(`Project ${id} rejected (UI action).`);
        alert(`Project rejected. To make this permanent, a 'rejectProject' function should be added to the smart contract.`);
        setAllProjects(prev => prev.filter(p => p.id !== id));
    };

    const stats = {
        total: allProjects.length,
        pending: allProjects.filter(p => p.status === 'pending').length,
        approved: allProjects.filter(p => p.status === 'approved').length,
        rejected: 0, // Not tracked on-chain
    };

    if (loading) {
        return (
          <div className="flex items-center justify-center" style={{minHeight: 'calc(100vh - 64px)'}}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects from the blockchain...</p>
            </div>
          </div>
        );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Approval Dashboard</h2>
            <p className="text-gray-600">Review and approve blue carbon restoration projects from the blockchain.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600 font-medium">Total Projects</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600 font-medium">Pending Review</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <p className="text-sm text-gray-600 font-medium">Approved</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <p className="text-sm text-gray-600 font-medium">Rejected</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejected}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by Project ID, Name, or Owner Address..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>

                    <div className="flex items-center space-x-2">
                    <Filter className="text-gray-500 w-5 h-5" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-700"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {filteredProjects.length === 0 && !loading ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))}
                </div>
            )}
        </div>
      </div>
    );
}

