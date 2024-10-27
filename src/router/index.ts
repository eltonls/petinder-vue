import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/home.vue'
import Login from '../views/Login/login.vue'
import Register from '@/views/Register/register.vue'
import Account from '@/views/Account/account.vue'

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
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        hasNavBar: true
      }
    },
  ]
})

export default router
