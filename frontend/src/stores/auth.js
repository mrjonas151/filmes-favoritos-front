import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
  },
  
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post('http://localhost:8000/api/login', credentials);
        
        this.token = response.data.token;
        this.user = response.data.user;
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        
        return true;
      } catch (error) {
        this.error = error.response?.data?.message || 'Falha na autenticação';
        console.error('Erro no login:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async register(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post('http://localhost:8000/api/register', userData);
        
        if (response.data.success) {
          return await this.login({
            email: userData.email,
            password: userData.password
          });
        }
        
        return false;
      } catch (error) {
        this.error = error.response?.data?.message || 'Falha no registro';
        console.error('Erro no registro:', error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      delete axios.defaults.headers.common['Authorization'];
    }
  }
});