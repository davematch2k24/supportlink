import LoginView from '@/views/auth/LoginView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import LandingPageView from '@/views/system/LandingPageView.vue'
import ClientInfo from '@/views/system/ClientInfo.vue'
import ClientRequest from '@/views/system/ClientRequest.vue'
import ViewResult from '@/views/system/ViewResult.vue'
import TrackingPage from '@/views/system/TrackingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      name: 'home',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
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
    {
      path: '/trackingpage',
      name: 'trackingpage',
      component: TrackingPage,
    },
  ],
})

export default router
