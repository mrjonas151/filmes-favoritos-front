import { defineStore } from 'pinia';
import authService from '../services/authService';

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
        const data = await authService.login(credentials);
        
        this.token = data.token;
        this.user = data.user;
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        authService.setAuthHeader(this.token);
        
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
        const data = await authService.register(userData);
        
        if (data.success) {
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
      
      authService.setAuthHeader(null);
    }
  }
});