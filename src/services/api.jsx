// ============================================
// API service layer
// ============================================
import axios from 'axios';

const API_BASE_URL = 'https://human-looping-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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