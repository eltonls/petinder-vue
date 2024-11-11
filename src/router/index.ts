import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/home.vue'
import Login from '../views/Login/login.vue'
import Register from '@/views/Register/register.vue'
import Profile from '@/views/Profile/profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        hasNavBar: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        hasNavBar: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hasNavBar: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        hasNavBar: true
      }
    }
  ]
})

export default router
