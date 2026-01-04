// ============================================
// API service layer
// ============================================
import axios from 'axios';

// Backend uses /api prefix in routes
const API_BASE_URL = 'https://human-looping-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 second timeout for Render free tier cold starts
});

// Request interceptor - log outgoing requests
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout - Render free tier is waking up (can take 30-50s)');
      error.userMessage = 'The server is starting up. This can take 30-50 seconds on the first request. Please try again.';
    } else if (error.response) {
      // Server responded with error status
      console.error(`❌ API Error: ${error.response.status}`, error.response.data);
      error.userMessage = error.response.data?.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response received
      console.error('🌐 Network Error: No response from server', error.message);
      error.userMessage = 'Cannot connect to server. Please check your internet connection or try again later.';
    } else {
      // Something else happened
      console.error('⚠️ Error:', error.message);
      error.userMessage = error.message;
    }
    return Promise.reject(error);
  }
);

// Workflow APIs
export const workflowAPI = {
  getAll: () => api.get('/workflows'),
  getById: (id) => api.get(`/workflows/${id}`),
  create: (data) => api.post('/workflows', data),
  updateStatus: (id, status) => api.patch(`/workflows/${id}/status`, { status }),
  delete: (id) => api.delete(`/workflows/${id}`),
};

// Approval APIs
export const approvalAPI = {
  getPending: () => api.get('/approvals/pending'),
  getAll: () => api.get('/approvals'),
  getById: (id) => api.get(`/approvals/${id}`),
  approve: (id, data) => api.post(`/approvals/${id}/approve`, data),
  reject: (id, data) => api.post(`/approvals/${id}/reject`, data),
};

export default api;