import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class AuthService {
  async login(credentials) {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  }

  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  }

  setAuthHeader(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}

export default new AuthService();