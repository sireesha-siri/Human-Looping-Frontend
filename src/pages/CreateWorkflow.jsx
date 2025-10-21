// ============================================
// Workflow creation form
// ============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workflowAPI } from '../services/api';

const CreateWorkflow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'other',
    riskLevel: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await workflowAPI.create(formData);
      alert('Workflow created successfully!');
      navigate('/approvals');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating workflow');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Create New Workflow</h1>
        <p className="mt-2 text-gray-600">Define a new workflow that requires approval</p>
      </div>
      
      {error && (
        <div className="px-4 py-3 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Workflow Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., Deploy to Production"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Describe what this workflow does..."
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Workflow Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="deployment">Deployment</option>
            <option value="email_campaign">Email Campaign</option>
            <option value="financial_transaction">Financial Transaction</option>
            <option value="code_review">Code Review</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Risk Level
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map((level) => (
              <label key={level} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="riskLevel"
                  value={level}
                  checked={formData.riskLevel === level}
                  onChange={handleChange}
                  className="w-4 h-4 mr-2 text-primary"
                />
                <span className="capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 font-medium text-white transition rounded-lg bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Workflow'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkflow;