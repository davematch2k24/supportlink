<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import LandingPageView from '@/views/system/LandingPageView.vue'
import ClientInfo from '@/views/system/ClientInfo.vue'
import ClientRequest from '@/views/system/ClientRequest.vue'
import ViewResult from '@/views/system/ViewResult.vue'
=======
import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import LandingPageView from '@/views/system/LandingPageView.vue'
import { createRouter, createWebHistory } from 'vue-router'
>>>>>>> friend/main

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: LandingPageView,
    },
    {
      path: '/login',
<<<<<<< HEAD
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
=======
      name: 'home',
      component: LoginView,
    },
    {
>>>>>>> friend/main
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
<<<<<<< HEAD
    {
      path: '/clientinfo',
      name: 'clientinfo',
      component: ClientInfo,
    },
    {
      path: '/clientrequest',
      name: 'clientrequest',
      component: ClientRequest,
    },
    {
      path: '/viewresult',
      name: 'viewresult',
      component: ViewResult,
    },
=======
>>>>>>> friend/main
  ],
})

export default router
