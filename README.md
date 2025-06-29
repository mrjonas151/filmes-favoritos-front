# 🎬 Frontend NewMovies - Instruções de Instalação

## ✅ Requisitos

-   [Node.js](https://nodejs.org/en) 18 ou superior
-   [npm](https://www.npmjs.com/)

## 📦 Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/mrjonas151/filmes-favoritos-front.git
    ```

2. Acesse o diretório do frontend e instale as dependências:
    ```bash
    cd frontend
    npm install
    ```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
VITE_TMDB_API_KEY=sua_api_key_aqui
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

## 🚀 Execução Local

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## Docker

Para iniciar o projeto com docker, basta digitar no terminal:

```
docker-compose up --build
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

> **Atenção:** Certifique-se de que o backend esteja rodando em [http://localhost:8000](http://localhost:8000).
