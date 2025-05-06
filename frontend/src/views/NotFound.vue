<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
    router.push("/");
};
</script>

<template>
    <div class="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-xl text-gray-600 mb-8">Página não encontrada</p>
        <button
            @click="goHome"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
            Voltar para a página inicial
        </button>
    </div>
</template>
