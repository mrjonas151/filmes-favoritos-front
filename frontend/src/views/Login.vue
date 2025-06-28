<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos';
    return;
  }
  
  error.value = '';
  loading.value = true;
  
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    });
    
    if (success) {
      router.push('/');
    } else {
      error.value = authStore.error || 'Credenciais inválidas';
    }
  } catch (err) {
    console.error(err);
    error.value = 'Ocorreu um erro ao tentar fazer login';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen w-screen flex items-center justify-center bg-red-200 m-0 p-0 absolute inset-0">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="********"
          />
        </div>
        
        <div>
          <button
            type="submit"
            class="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200"
            :disabled="loading"
          >
            {{ loading ? 'Processando...' : 'Entrar' }}
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Não tem uma conta? 
          <router-link to="/register" class="text-red-500 hover:text-red-700 font-bold">
            Registre-se
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>