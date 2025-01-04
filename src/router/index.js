import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'
import { user } from '@/utils/authService'
import RequestsDataView from '@/views/system/RequestsDataView.vue'

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
    meta: { requiresAuth: true },
  },
  {
    path: '/resourcesdata',
    name: 'resourcesdata',
    component: ResourcesData,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginWorker,
  },
  {
    path: '/requestsdataview',
    name: 'requestsdataview',
    component: RequestsDataView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Protect routes that require authentication
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authToken = localStorage.getItem('supabase.auth.token')

    if (!authToken) {
      next({ path: '/login' })
    } else {
      // Fetch user details if not already available
      if (!user.value) {
        try {
          const { data, error } = await supabase.auth.getUser(authToken)
          if (error) {
            console.error('Error fetching user:', error)
            next({ path: '/login' })
          } else {
            user.value = data.user
          }
        } catch (err) {
          console.error('Error fetching user:', err)
          next({ path: '/login' })
        }
      }

      next()
    }
  } else {
    next()
  }
})

export default router
