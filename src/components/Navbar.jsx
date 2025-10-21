// ============================================
// Navigation bar component
// ============================================
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, CheckCircle, History } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/create', label: 'Create Workflow', icon: Plus },
    { path: '/approvals', label: 'Approvals', icon: CheckCircle },
    { path: '/history', label: 'History', icon: History },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
            <CheckCircle className="text-primary" />
            <span>Human-in-Loop System</span>
          </Link>
          
          <div className="hidden space-x-2 md:flex">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="flex space-x-2 md:hidden">
            {navLinks.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-lg transition ${
                  location.pathname === path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
