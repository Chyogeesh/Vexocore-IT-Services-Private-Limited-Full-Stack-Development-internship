import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // Update with deployed URL

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Use AsyncStorage in production
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
