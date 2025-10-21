// ============================================
// Dashboard page with statistics
// ============================================
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { workflowAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await workflowAPI.getAll();
      const workflows = response.data.data;
      
      setStats({
        pending: workflows.filter(w => w.status === 'pending_approval').length,
        approved: workflows.filter(w => w.status === 'approved').length,
        rejected: workflows.filter(w => w.status === 'rejected').length,
        total: workflows.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of all workflow approvals</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Workflows"
          value={stats.total}
          icon={Clock}
          color="bg-blue-500"
        />
        <StatsCard
          title="Pending Approvals"
          value={stats.pending}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          color="bg-red-500"
        />
      </div>

      <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <a
            href="/create"
            className="p-4 text-center transition border-2 border-gray-300 border-dashed rounded-lg hover:border-primary hover:bg-blue-50"
          >
            <p className="font-medium text-gray-700">Create New Workflow</p>
          </a>
          <a
            href="/approvals"
            className="p-4 text-center transition border-2 border-gray-300 border-dashed rounded-lg hover:border-primary hover:bg-blue-50"
          >
            <p className="font-medium text-gray-700">View Pending Approvals</p>
          </a>
          <a
            href="/history"
            className="p-4 text-center transition border-2 border-gray-300 border-dashed rounded-lg hover:border-primary hover:bg-blue-50"
          >
            <p className="font-medium text-gray-700">View History</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
