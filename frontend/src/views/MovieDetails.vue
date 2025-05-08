<script setup>
const movie = {
  id: 123,
  title: "Duna: Parte 2",
  overview: "Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve impedir um futuro terrível que só ele pode prever.",
  vote_average: 8.4,
  release_date: "2024-03-01",
  runtime: 166,
  genres: [
    { id: 1, name: "Ficção Científica" },
    { id: 2, name: "Aventura" },
    { id: 3, name: "Drama" }
  ]
};

const isFavorite = false;

const stars = [
  { id: 1, filled: true },
  { id: 2, filled: true },
  { id: 3, filled: true },
  { id: 4, filled: true },
  { id: 5, filled: false }
];

const formattedDate = new Date(movie.release_date).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});
</script>

<template>
    <div class="w-full px-4 py-6">
        <button class="flex items-center text-red-500 mb-6 hover:text-red-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Voltar
        </button>
        
        <div class="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="md:w-1/3 bg-gray-200">
                <img 
                    src="https://image.tmdb.org/t/p/w500/1olJMMIUYkV6XwET1xRIROqYkxO.jpg" 
                    alt="Duna: Parte 2"
                    class="w-full h-auto object-cover"
                />
            </div>
            
            <div class="md:w-2/3 p-6">
                <div class="flex justify-between items-start mb-4">
                    <h1 class="text-3xl font-bold text-gray-800">{{ movie.title }}</h1>
                    <button 
                        class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                
                <div class="flex items-center mb-4">
                    <div class="flex mr-3">
                        <svg 
                            v-for="star in stars" 
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
                    <span class="text-gray-600">{{ movie.vote_average.toFixed(1) }}/10</span>
                </div>
                
                <div class="text-gray-600 mb-6">
                    <p>{{ formattedDate }}</p>
                    <p class="mt-1">Duração: {{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}min</p>
                </div>
                
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Sinopse</h2>
                    <p class="text-gray-700 leading-relaxed">
                        {{ movie.overview }}
                    </p>
                </div>
                
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-2">Gêneros</h2>
                    <div class="flex flex-wrap gap-2">
                        <span 
                            v-for="genre in movie.genres" 
                            :key="genre.id"
                            class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                            {{ genre.name }}
                        </span>
                    </div>
                </div>
                
                <button 
                    class="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    Adicionar aos Favoritos
                </button>
            </div>
        </div>
    </div>
</template>