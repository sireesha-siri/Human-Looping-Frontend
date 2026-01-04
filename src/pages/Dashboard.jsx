import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckCircle, Clock, History, TrendingUp, AlertTriangle } from 'lucide-react';
import { workflowAPI } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      console.log('🔄 Fetching dashboard data...');
      const workflowsRes = await workflowAPI.getAll();
      console.log('📦 Full API Response:', workflowsRes);
      console.log('📊 Response data field:', workflowsRes.data);
      
      // Access the data field from axios response
      const apiData = workflowsRes.data;
      console.log('🎯 API Data object:', apiData);
      
      // Get workflows array from the data.data field
      const workflows = apiData?.data || [];
      console.log('📝 Workflows array:', workflows);
      console.log('📝 Number of workflows:', workflows.length);

      if (!Array.isArray(workflows)) {
        console.error('❌ Workflows is not an array:', workflows);
        setLoading(false);
        return;
      }

      // Log each workflow status
      workflows.forEach((w, i) => {
        console.log(`Workflow ${i + 1}:`, { name: w.name, status: w.status });
      });

      // Calculate stats
      const pending = workflows.filter(w => w.status === 'pending_approval').length;
      const approved = workflows.filter(w => w.status === 'approved').length;
      const rejected = workflows.filter(w => w.status === 'rejected').length;

      console.log('📈 Calculated Stats:', { 
        total: workflows.length, 
        pending, 
        approved, 
        rejected 
      });

      setStats({
        total: workflows.length,
        pending,
        approved,
        rejected,
      });

      // Get recent activity (last 5 workflows)
      const recent = workflows
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(w => ({
          id: w._id,
          name: w.name,
          status: w.status === 'pending_approval' ? 'pending' : w.status,
          time: formatTimeAgo(w.updatedAt || w.createdAt),
        }));

      console.log('⏰ Recent Activity:', recent);
      setRecentActivity(recent);
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      console.error('Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, onClick, color }) => (
    <button
      onClick={onClick}
      className="p-6 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of all workflow approvals and system activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Workflows"
          value={stats.total}
          icon={TrendingUp}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pending}
          icon={Clock}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={AlertTriangle}
          color="text-red-600"
          bgColor="bg-red-100"
        />
      </div>

      {/* Quick Actions - Enhanced */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickActionCard
            title="Create New Workflow"
            description="Start a new approval workflow"
            icon={Plus}
            onClick={() => navigate('/create')}
            color="bg-blue-500"
          />
          <QuickActionCard
            title="View Pending Approvals"
            description={`${stats.pending} workflow${stats.pending !== 1 ? 's' : ''} awaiting review`}
            icon={Clock}
            onClick={() => navigate('/approvals')}
            color="bg-yellow-500"
          />
          <QuickActionCard
            title="View History"
            description="Browse all completed workflows"
            icon={History}
            onClick={() => navigate('/history')}
            color="bg-purple-500"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {activity.status === 'approved' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {activity.status === 'pending' && (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      )}
                      {activity.status === 'rejected' && (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{activity.name}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        activity.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <History className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No recent activity</p>
                <button
                  onClick={() => navigate('/create')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create your first workflow →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="p-6 border-l-4 border-blue-500 rounded-lg bg-blue-50">
        <h3 className="font-semibold text-blue-900">💡 Pro Tip</h3>
        <p className="mt-2 text-sm text-blue-800">
          Workflows with <span className="font-medium">high risk levels</span> require careful review. 
          Always check the description and consider potential impacts before approving.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;