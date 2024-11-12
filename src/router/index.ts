import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/home.vue'
import Login from '../views/Login/login.vue'
import Register from '@/views/Register/register.vue'
import Profile from '@/views/Profile/profile.vue'
import Chat from "@/views/Chat/index.vue";
import Editpet from '@/views/Pet-update/pet-update.vue'
import { guardUser } from './guards/user.guard'

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
      },
      beforeEnter: (to, from, next) => {
        guardUser(to, from, next);
      }
    },
    {
      path: '/pet-update/:id',
      name: 'pet-update',
      component: Editpet,
      meta: {
        hasNavBar: true
      },
      beforeEnter: (to, from, next) => {
        guardUser(to, from, next);
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        hasNavBar: true
      } 
    }
  ]
})

export default router
