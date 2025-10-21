// ============================================
// Approvals page with modal
// ============================================
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowCard from '../components/WorkflowCard';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { approvalAPI } from '../services/api';

const Approvals = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [actionType, setActionType] = useState('');
  const [toast, setToast] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const response = await approvalAPI.getPending();
      setApprovals(response.data.data);
    } catch (error) {
      showToast('Error fetching approvals: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleApproveClick = (workflowId) => {
    const approval = approvals.find(a => a.workflowId._id === workflowId);
    setSelectedWorkflow(approval);
    setActionType('approve');
    setFeedback('');
    setShowModal(true);
  };

  const handleRejectClick = (workflowId) => {
    const approval = approvals.find(a => a.workflowId._id === workflowId);
    setSelectedWorkflow(approval);
    setActionType('reject');
    setFeedback('');
    setShowModal(true);
  };

  const handleSubmitAction = async () => {
    if (actionType === 'reject' && !feedback.trim()) {
      showToast('Please provide a reason for rejection', 'error');
      return;
    }

    setProcessing(true);
    try {
      const data = {
        feedback: feedback || (actionType === 'approve' ? 'Approved' : 'Rejected'),
        respondedBy: 'Human Reviewer'
      };

      if (actionType === 'approve') {
        await approvalAPI.approve(selectedWorkflow._id, data);
        showToast('Workflow approved successfully!', 'success');
      } else {
        await approvalAPI.reject(selectedWorkflow._id, data);
        showToast('Workflow rejected', 'success');
      }

      setShowModal(false);
      setFeedback('');
      setSelectedWorkflow(null);
      fetchApprovals();
    } catch (error) {
      showToast('Error: ' + error.message, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Pending Approvals
          </h1>
          <p className="mt-2 text-gray-600">
            {approvals.length} workflow{approvals.length !== 1 ? 's' : ''} awaiting your review
          </p>
        </div>
      </div>
      
      {approvals.length === 0 ? (
        <EmptyState
          message="No pending approvals at the moment"
          actionLabel="Create New Workflow"
          onAction={() => navigate('/create')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approvals.map((approval) => (
            <WorkflowCard
              key={approval._id}
              workflow={approval.workflowId}
              onApprove={handleApproveClick}
              onReject={handleRejectClick}
            />
          ))}
        </div>
      )}

      {/* Approval/Rejection Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => !processing && setShowModal(false)}
        title={actionType === 'approve' ? 'Approve Workflow' : 'Reject Workflow'}
      >
        {selectedWorkflow && (
          <div>
            <div className="p-4 mb-4 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedWorkflow.workflowId.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {selectedWorkflow.workflowId.description}
              </p>
              <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                <span>Type: <span className="font-medium">{selectedWorkflow.workflowId.type.replace('_', ' ')}</span></span>
                <span>Risk: <span className="font-medium capitalize">{selectedWorkflow.workflowId.riskLevel}</span></span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                {actionType === 'approve' ? 'Comment (Optional)' : 'Reason for Rejection *'}
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={actionType === 'approve' 
                  ? 'Add any comments...'
                  : 'Please explain why this workflow is being rejected...'
                }
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={processing}
                className="flex-1 px-6 py-3 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAction}
                disabled={processing}
                className={`flex-1 px-6 py-3 rounded-lg text-white transition disabled:opacity-50 font-medium ${
                  actionType === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {processing ? 'Processing...' : (actionType === 'approve' ? 'Approve' : 'Reject')}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Approvals;