import { useState } from 'react';
import { CheckCircle, XCircle, Clock, MapPin, Building2, Leaf } from 'lucide-react';

export default function ProjectCard({ project, onApprove, onReject }) {
  // State to manage the number of credits to mint for this specific card
  const [creditsToMint, setCreditsToMint] = useState(project.estimated_carbon_credits || 100);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    approved: 'bg-green-100 text-green-800 border-green-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    approved: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{project.project_name}</h3>
            <p className="text-sm text-gray-600 mt-1">ID: {project.project_id}</p>
          </div>
          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
            {statusIcons[project.status]}
            <span className="capitalize">{project.status}</span>
          </span>
        </div>
      </div>

      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-700">{project.organization_name}</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
            {project.organization_type}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-green-600" />
          <span>{project.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-blue-600 font-medium">Area</p>
            <p className="text-lg font-bold text-blue-900">{project.area_hectares} ha</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-green-600 font-medium">Est. Carbon Credits</p>
            <p className="text-lg font-bold text-green-900">{project.estimated_carbon_credits.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm pt-2">
          <Leaf className="w-4 h-4 text-green-600" />
          <span className="text-gray-700 font-medium">{project.ecosystem_type}</span>
        </div>

        <div className="text-xs text-gray-500 pt-2">
          Submitted: {new Date(project.submitted_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {project.status === 'pending' && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-3">
          <div>
            <label htmlFor={`credits-${project.id}`} className="text-xs font-medium text-gray-600">Credits to Mint:</label>
            <input
              id={`credits-${project.id}`}
              type="number"
              value={creditsToMint}
              onChange={(e) => setCreditsToMint(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => onApprove(project.projectId, creditsToMint)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button
              onClick={() => onReject(project.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      )}

      {project.status !== 'pending' && project.reviewed_at && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Reviewed on {new Date(project.reviewed_at).toLocaleDateString('en-IN')}
            {project.reviewed_by && ` by ${project.reviewed_by}`}
          </p>
        </div>
      )}
    </div>
  );
}
