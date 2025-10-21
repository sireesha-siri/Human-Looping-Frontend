# Human-in-Loop System - Frontend

> A modern, responsive React application for managing workflow approvals with real-time dashboard and intuitive user interface.

**Live Demo:** [Add your Vercel deployment URL]

---

## 🎯 Overview

The frontend provides an intuitive interface for creating workflows, managing approvals, and tracking workflow history. Built with React and Tailwind CSS, it offers a seamless user experience across all devices.

---

## ✨ Features

- **📊 Real-time Dashboard**: Live statistics showing workflow states
- **➕ Workflow Creation**: Easy-to-use form for creating new workflows
- **✅ Approval Management**: Quick approve/reject interface with modal dialogs
- **📜 Complete History**: Audit trail of all workflow actions
- **🎨 Modern UI**: Clean, responsive design with Tailwind CSS
- **🔔 Toast Notifications**: Real-time feedback for user actions
- **📱 Mobile Responsive**: Works seamlessly on all screen sizes
- **⚡ Fast Loading**: Optimized with Vite for lightning-fast builds

---

## 🛠️ Tech Stack

- **React 19.1.1** - Modern UI library with latest features
- **Vite 7.1.7** - Next-generation frontend tooling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **React Router DOM 7.9.4** - Client-side routing
- **Axios 1.12.2** - HTTP client for API calls
- **Lucide React 0.546.0** - Beautiful icon library

---

## 📁 Project Structure

```
client/
├── index.html                 # Entry HTML file
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── .gitignore
│
└── src/
    ├── main.jsx             # Application entry point
    ├── App.jsx              # Root component with routing
    ├── index.css            # Global styles with Tailwind
    │
    ├── components/          # Reusable UI components
    │   ├── Navbar.jsx       # Navigation header
    │   ├── StatsCard.jsx    # Dashboard statistics card
    │   ├── WorkflowCard.jsx # Individual workflow display
    │   ├── Modal.jsx        # Modal dialog for approvals
    │   ├── Toast.jsx        # Notification toast
    │   ├── LoadingSpinner.jsx
    │   └── EmptyState.jsx   # Empty state placeholder
    │
    ├── pages/               # Page-level components
    │   ├── Dashboard.jsx    # Main dashboard view
    │   ├── CreateWorkflow.jsx # Workflow creation form
    │   ├── Approvals.jsx    # Pending approvals list
    │   └── History.jsx      # Workflow history
    │
    └── services/
        └── api.js           # API service layer
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd human-loop-system/client
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API endpoint**

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

For production:
```env
VITE_API_URL=https://your-backend-api.onrender.com
```

4. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

---

## 🎨 Component Documentation

### Pages

#### Dashboard (`pages/Dashboard.jsx`)
- Displays workflow statistics (Total, Pending, Approved, Rejected)
- Quick action buttons for navigation
- Real-time data fetching with loading states

#### Create Workflow (`pages/CreateWorkflow.jsx`)
- Form with validation for workflow creation
- Fields: Name, Description, Type, Risk Level
- Toast notifications for success/error feedback

#### Approvals (`pages/Approvals.jsx`)
- List of pending approval requests
- Modal dialog for approve/reject actions
- Real-time updates after actions

#### History (`pages/History.jsx`)
- Complete audit trail of all workflows
- Color-coded status badges
- Filterable and searchable (future enhancement)

### Components

#### Navbar (`components/Navbar.jsx`)
```jsx
// Usage
<Navbar />
```
- Fixed navigation with logo and menu items
- Active route highlighting
- Mobile responsive with hamburger menu

#### StatsCard (`components/StatsCard.jsx`)
```jsx
// Usage
<StatsCard 
  title="Total Workflows"
  value={45}
  icon={<Activity />}
  color="blue"
/>
```

#### Modal (`components/Modal.jsx`)
```jsx
// Usage
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Approve Workflow"
>
  <p>Content goes here</p>
</Modal>
```

#### Toast (`components/Toast.jsx`)
```jsx
// Usage
<Toast
  message="Workflow approved successfully!"
  type="success"
  isVisible={showToast}
  onClose={() => setShowToast(false)}
/>
```

---

## 🔌 API Integration

The frontend communicates with the backend via the API service layer (`services/api.js`):

```javascript
import api from './services/api';

// Get all workflows
const workflows = await api.getWorkflows();

// Create workflow
const newWorkflow = await api.createWorkflow(data);

// Get pending approvals
const pending = await api.getPendingApprovals();

// Approve workflow
await api.approveWorkflow(id, { comments: 'LGTM!' });

// Reject workflow
await api.rejectWorkflow(id, { reason: 'Needs revision' });
```

---

## 🎨 Styling Guide

### Tailwind CSS Classes

The project uses Tailwind's utility-first approach:

```jsx
// Card component example
<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
  <h3 className="text-xl font-semibold text-gray-800 mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

### Custom Colors

Defined in `tailwind.config.js`:
- **primary**: `#3B82F6` (blue)
- **success**: `#10B981` (green)
- **warning**: `#F59E0B` (yellow)
- **danger**: `#EF4444` (red)

### Custom Animations

```css
/* Slide-in animation */
.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

/* Fade-in animation */
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
```

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure:
  - **Framework Preset**: Vite
  - **Root Directory**: `client`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

3. **Environment Variables**
Add in Vercel dashboard:
```
VITE_API_URL=https://your-backend-api.onrender.com
```

4. **Deploy**
Click "Deploy" and wait for build to complete

### Manual Build

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy dist/ folder to any static hosting
```

---

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Failed**
```bash
# Check if backend is running
curl http://localhost:5000/health

# Verify VITE_API_URL in .env
echo $VITE_API_URL
```

**2. Styles Not Loading**
```bash
# Reinstall Tailwind dependencies
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# Rebuild
npm run build
```

**3. Build Fails on Vercel**
- Check Node.js version (should be 16+)
- Ensure all dependencies are in `package.json`
- Clear build cache and redeploy

**4. CORS Errors**
- Ensure backend has CORS enabled
- Check `VITE_API_URL` points to correct backend
- Verify backend allows your frontend origin

---

## 🔧 Configuration Files

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### `tailwind.config.js`
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      }
    },
  },
  plugins: [],
}
```

---

## 🔮 Future Enhancements

- [ ] Dark mode support
- [ ] Advanced filtering and search
- [ ] Workflow templates
- [ ] Bulk operations
- [ ] Export to CSV/PDF
- [ ] Real-time updates with WebSockets
- [ ] Offline support with PWA
- [ ] Internationalization (i18n)
- [ ] Keyboard shortcuts
- [ ] Advanced analytics charts

---

## 👥 Author

**Sireesha Aguru**  
- 📧 Email: a.sireesha531@gmail.com  
- 💼 LinkedIn: [linkedin.com/in/sireesha-aguru](https://www.linkedin.com/in/sireesha-aguru-1a70b7257/)  
- 🐙 GitHub: [github.com/sireesha-siri](https://github.com/sireesha-siri/)  
- 🌐 Portfolio: [sireesha-siri.github.io/my-portfolio/](https://sireesha-siri.github.io/my-portfolio/)

---

## 📝 License

MIT License - Free to use for learning and development purposes.

---

## 🙏 Acknowledgments

- Built for **Lyzr Hiring Challenge 2025**
- UI inspiration from modern Tailwind CSS applications
- Icons by [Lucide](https://lucide.dev/)
- Styling framework: [Tailwind CSS](https://tailwindcss.com/)
- Build tool: [Vite](https://vitejs.dev/)