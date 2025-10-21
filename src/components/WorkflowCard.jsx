// ============================================
// Workflow card component
// ============================================
import { Clock, AlertCircle } from 'lucide-react';

const statusColors = {
  created: 'bg-blue-100 text-blue-800',
  pending_approval: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-purple-100 text-purple-800',
};

const riskColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

const WorkflowCard = ({ workflow, onApprove, onReject }) => {
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  return (
    <div className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{workflow.name}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{workflow.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ml-2 whitespace-nowrap ${statusColors[workflow.status]}`}>
          {workflow.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="flex items-center mb-4 space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <Clock size={16} className="mr-1" />
          <span>{timeAgo(workflow.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <AlertCircle size={16} className={`mr-1 ${riskColors[workflow.riskLevel]}`} />
          <span className={riskColors[workflow.riskLevel]}>
            {workflow.riskLevel.toUpperCase()} Risk
          </span>
        </div>
      </div>

      <div className="mb-4 text-xs text-gray-500">
        <span className="font-medium">Type:</span> {workflow.type.replace('_', ' ')}
      </div>

      {workflow.status === 'pending_approval' && onApprove && onReject && (
        <div className="flex space-x-3">
          <button
            onClick={() => onApprove(workflow._id)}
            className="flex-1 px-4 py-2 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(workflow._id)}
            className="flex-1 px-4 py-2 font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkflowCard;

