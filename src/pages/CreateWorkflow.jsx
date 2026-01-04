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
  const [slowWarning, setSlowWarning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSlowWarning(false);

    // Show warning after 5 seconds if still loading
    const warningTimer = setTimeout(() => {
      setSlowWarning(true);
    }, 5000);

    try {
      const response = await workflowAPI.create(formData);
      clearTimeout(warningTimer);
      console.log('Workflow created:', response.data);
      alert('Workflow created successfully!');
      navigate('/approvals');
    } catch (error) {
      clearTimeout(warningTimer);
      console.error('Error creating workflow:', error);
      
      // Use the user-friendly message from the interceptor
      setError(error.userMessage || 'Error creating workflow');
    } finally {
      setLoading(false);
      setSlowWarning(false);
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

      {slowWarning && (
        <div className="px-4 py-3 mb-6 text-yellow-700 border border-yellow-200 rounded-lg bg-yellow-50">
          <p className="font-medium">⏳ This is taking longer than usual...</p>
          <p className="mt-1 text-sm">The server may be waking up from sleep (Render free tier). This can take 30-50 seconds on the first request. Please wait...</p>
        </div>
      )}

      <div className="p-8 bg-white rounded-lg shadow-md">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-4 h-4 mr-2 text-blue-500"
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
            disabled={loading}
            className="flex-1 px-6 py-3 font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3 font-medium text-white transition bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Workflow'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkflow;