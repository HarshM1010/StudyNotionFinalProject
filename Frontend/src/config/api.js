
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app'
  : 'http://localhost:5000';

fetch(`${API_BASE_URL}/api/endpoint`)