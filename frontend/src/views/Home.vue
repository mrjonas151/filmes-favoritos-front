<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = import.meta.env.VITE_TMDB_API_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const movies = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const searchResults = ref([]);
const isSearching = ref(false);

const fetchPopularMovies = async () => {
    loading.value = true;
    try {
        const response = await axios.get(
            `${apiUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`
        );
        movies.value = response.data.results;
    } catch (err) {
        error.value = "Erro ao carregar filmes populares";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const searchMovies = async () => {
    if (!searchQuery.value.trim()) {
        isSearching.value = false;
        return;
    }
    
    loading.value = true;
    isSearching.value = true;
    
    try {
        const response = await axios.get(
            `${apiUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(
                searchQuery.value
            )}&page=1&include_adult=false`
        );
        searchResults.value = response.data.results;
    } catch (err) {
        error.value = "Erro na pesquisa de filmes";
        console.error(err);
    } finally {
        loading.value = false;
    }
};

const renderStars = (rating) => {
    const starCount = Math.round(rating / 2);
    return Array(5)
        .fill(0)
        .map((_, i) => (i < starCount ? "filled" : "empty"));
};

const formatDate = (dateString) => {
    if (!dateString) return "Data desconhecida";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

const resetSearch = () => {
    searchQuery.value = "";
    isSearching.value = false;
};

watch(searchQuery, (newVal) => {
    if (!newVal.trim()) {
        isSearching.value = false;
    }
});

onMounted(fetchPopularMovies);
</script>

<template>
    <div class="w-full px-4 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-red-800 mb-4">
                NewMovies
            </h1>

            <div class="relative flex">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Buscar filmes..."
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    @keyup.enter="searchMovies"
                />
                <button 
                    @click="searchMovies"
                    class="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-8 py-2 transition"
                >
                    Buscar
                </button>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center py-20">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            ></div>
        </div>

        <div
            v-else-if="error"
            class="bg-red-100 text-red-700 p-4 rounded-lg mb-6"
        >
            {{ error }}
        </div>

        <div v-else-if="isSearching">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">
                    Resultados para "{{ searchQuery }}"
                </h2>
                <button 
                    @click="resetSearch" 
                    class="text-blue-500 hover:underline"
                >
                    Voltar aos populares
                </button>
            </div>

            <div
                v-if="searchResults.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
                <div
                    v-for="movie in searchResults"
                    :key="movie.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <div class="relative h-72 bg-gray-200">
                        <img
                            v-if="movie.poster_path"
                            :src="`${imageBaseUrl}${movie.poster_path}`"
                            :alt="movie.title"
                            class="w-full h-full object-cover"
                        />
                        <div v-else class="flex items-center justify-center h-full">
                            <span class="text-gray-400">Sem imagem</span>
                        </div>
                    </div>

                    <div class="p-4">
                        <h3
                            class="font-bold text-lg text-gray-800 mb-2 line-clamp-2"
                        >
                            {{ movie.title }}
                        </h3>

                        <div class="flex items-center mb-2">
                            <div class="flex">
                                <template
                                    v-for="(star, index) in renderStars(
                                        movie.vote_average
                                    )"
                                >
                                    <svg
                                        v-if="star === 'filled'"
                                        :key="`filled-${index}`"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-yellow-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg
                                        v-else
                                        :key="`empty-${index}`"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 text-gray-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                </template>
                            </div>
                            <span class="text-sm ml-2 text-gray-600"
                                >{{ movie.vote_average?.toFixed(1) || "N/A" }}/10</span
                            >
                        </div>

                        <p class="text-sm text-gray-600">
                            {{ formatDate(movie.release_date) }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-else class="text-center py-10">
                <p class="text-xl text-gray-600">Nenhum filme encontrado</p>
            </div>
        </div>

        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
            <div
                v-for="movie in movies"
                :key="movie.id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
                <div class="relative h-72 bg-gray-200">
                    <img
                        v-if="movie.poster_path"
                        :src="`${imageBaseUrl}${movie.poster_path}`"
                        :alt="movie.title"
                        class="w-full h-full object-cover"
                    />
                    <div v-else class="flex items-center justify-center h-full">
                        <span class="text-gray-400">Sem imagem</span>
                    </div>
                </div>

                <div class="p-4">
                    <h3
                        class="font-bold text-lg text-gray-800 mb-2 line-clamp-2"
                    >
                        {{ movie.title }}
                    </h3>

                    <div class="flex items-center mb-2">
                        <div class="flex">
                            <template
                                v-for="(star, index) in renderStars(
                                    movie.vote_average
                                )"
                            >
                                <svg
                                    v-if="star === 'filled'"
                                    :key="`filled-${index}`"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-yellow-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <svg
                                    v-else
                                    :key="`empty-${index}`"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-gray-300"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                            </template>
                        </div>
                        <span class="text-sm ml-2 text-gray-600"
                            >{{ movie.vote_average.toFixed(1) }}/10</span
                        >
                    </div>

                    <p class="text-sm text-gray-600">
                        {{ formatDate(movie.release_date) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>