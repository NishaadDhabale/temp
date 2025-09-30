import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './constants';

const RegisterProject = () => {
    const [contract, setContract] = useState(null);
    const [projects, setProjects] = useState([]);
    const [formInput, setFormInput] = useState({ name: '', location: '', hash: '' });
    const [isMining, setIsMining] = useState(false);
    const [message, setMessage] = useState('');

    const connectToContract = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);
            } catch (err) {
                console.error(err);
            }
        }
    }, []);

    const fetchProjects = useCallback(async () => {
        if (!contract) return;
        try {
            const allProjects = await contract.getAllProjects();
            setProjects([...allProjects].reverse()); // Show newest projects first
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [contract]);

    useEffect(() => {
        connectToContract();
        fetchProjects();
    }, [connectToContract, fetchProjects]);


    const handleRegister = async () => {
        if (!contract) return;
        setIsMining(true);

        try {
            const tx = await contract.registerProject(formInput.name, formInput.location, formInput.hash);
            await tx.wait();
            setMessage(`Success! Project "${formInput.name}" has been registered.`);
            setFormInput({ name: '', location: '', hash: '' });
            fetchProjects();
        } catch (error) {
            console.error("Registration failed:", error);
            setMessage('Error: Registration failed. Please try again.');
        } finally {
            setIsMining(false);
        }
    };

    return (
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
    );
};

export default RegisterProject;