import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MovieDetails from '../views/MovieDetails.vue'
import NotFound from '../views/NotFound.vue'
import Favorites from '../views/Favorites.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { guest: true }
  },
  {
    path: '/movie/:id',
    name: 'movie-details',
    component: MovieDetails,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },

  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuestOnly = to.matched.some(record => record.meta.guest)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (isGuestOnly && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router