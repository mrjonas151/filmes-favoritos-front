<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const favorites = ref([
  {
    id: 123,
    title: "Duna: Parte 2",
    vote_average: 8.4,
    release_date: "2024-03-01",
    poster_path: "https://image.tmdb.org/t/p/w500/1olJMMIUYkV6XwET1xRIROqYkxO.jpg"
  },
  {
    id: 456,
    title: "Oppenheimer",
    vote_average: 8.2,
    release_date: "2023-07-21",
    poster_path: "https://image.tmdb.org/t/p/w500/1olJMMIUYkV6XwET1xRIROqYkxO.jpg"
  },
  {
    id: 789,
    title: "Barbie",
    vote_average: 7.9,
    release_date: "2023-07-21",
    poster_path: "https://image.tmdb.org/t/p/w500/1olJMMIUYkV6XwET1xRIROqYkxO.jpg"
  },
  {
    id: 101,
    title: "Pobres Criaturas",
    vote_average: 8.0,
    release_date: "2023-12-08",
    poster_path: "https://image.tmdb.org/t/p/w500/1olJMMIUYkV6XwET1xRIROqYkxO.jpg"
  }
]);

const formatDate = (dateString) => {
  if (!dateString) return "Data desconhecida";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const renderStars = (rating) => {
  const starCount = Math.round(rating / 2);
  return Array(5)
    .fill()
    .map((_, i) => ({ id: i + 1, filled: i < starCount }));
};

const removeFromFavorites = (id) => {
  favorites.value = favorites.value.filter(movie => movie.id !== id);
};

const goToMovieDetails = (id) => {
  router.push(`/movie/${id}`);
};
</script>

<template>
  <div class="w-full px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Meus Favoritos</h1>

    <div v-if="favorites.length === 0" class="text-center py-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <h2 class="text-xl font-semibold text-gray-700 mb-2">Nenhum favorito ainda</h2>
      <p class="text-gray-600 mb-6">Adicione filmes aos seus favoritos para vê-los aqui.</p>
      <button 
        @click="router.push('/')" 
        class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Explorar filmes
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="movie in favorites" 
        :key="movie.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div class="relative">
          <button 
            @click="removeFromFavorites(movie.id)" 
            class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition z-10"
            title="Remover dos favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div @click="goToMovieDetails(movie.id)" class="cursor-pointer">
            <img 
              :src="movie.poster_path" 
              :alt="movie.title" 
              class="w-full h-64 object-cover"
            />
          </div>
        </div>
        
        <div class="p-4">
          <h3 
            @click="goToMovieDetails(movie.id)"
            class="font-bold text-lg text-gray-800 mb-2 hover:text-red-500 cursor-pointer"
          >
            {{ movie.title }}
          </h3>
          
          <div class="flex items-center mb-2">
            <div class="flex">
              <svg 
                v-for="star in renderStars(movie.vote_average)" 
                :key="star.id"
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5" 
                :class="star.filled ? 'text-yellow-400' : 'text-gray-300'"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm ml-2 text-gray-600">{{ movie.vote_average.toFixed(1) }}/10</span>
          </div>
          
          <p class="text-sm text-gray-600">
            {{ formatDate(movie.release_date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>