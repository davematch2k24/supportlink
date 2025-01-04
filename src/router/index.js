import { createRouter, createWebHistory } from 'vue-router'
import { user } from '@/utils/authService'

// Lazy load components
const LandingPageView = () => import('@/views/system/LandingPageView.vue')
const ClientInfo = () => import('@/views/system/ClientInfo.vue')
const ClientRequest = () => import('@/views/system/ClientRequest.vue')
const ViewResult = () => import('@/views/system/ViewResult.vue')
const TrackingPage = () => import('@/views/system/TrackingPage.vue')
const RequestsData = () => import('@/views/system/RequestsData.vue')
const ResourcesData = () => import('@/views/system/ResourcesData.vue')
const LoginWorker = () => import('@/components/system/LoginWorker.vue')

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: LandingPageView,
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
  {
    path: '/requestsdata',
    name: 'requestsdata',
    component: RequestsData,
    meta: { requiresAuth: true, roles: ['admin', 'worker'] },
  },
  {
    path: '/resourcesdata',
    name: 'resourcesdata',
    component: ResourcesData,
    meta: { requiresAuth: true, roles: ['admin', 'worker'] },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginWorker,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Protect routes that require authentication and check for roles
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user.value) {
      next({ path: '/login' })
    } else if (!to.meta.roles.includes(user.value.role)) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
