<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');

const handleRegister = async () => {
  if (!fullName.value || !email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos';
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não conferem';
    return;
  }
  
  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres';
    return;
  }
  
  error.value = '';
  loading.value = true;
  
  try {
    const success = await authStore.register({
      name: fullName.value,
      email: email.value,
      password: password.value
    });
    
    if (success) {
      router.push('/');
    } else {
      error.value = authStore.error || 'Erro ao criar conta';
    }
  } catch (err) {
    console.error(err);
    error.value = 'Ocorreu um erro ao tentar criar sua conta';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen w-screen flex items-center justify-center bg-red-200 m-0 p-0 absolute inset-0">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Criar Conta</h2>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input
            id="fullName"
            v-model="fullName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="email@email.com"
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
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
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
            {{ loading ? 'Processando...' : 'Criar Conta' }}
          </button>
        </div>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Já tem uma conta? 
          <router-link to="/login" class="text-red-500 hover:text-red-700 font-bold">
            Faça login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>