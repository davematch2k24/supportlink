import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'

// Import components
import LandingPage from '@/components/LandingPage.vue'
import ClientInfo from '@/components/ClientInfo.vue'
import ClientRequest from '@/components/ClientRequest.vue'
import ViewResult from '@/components/ViewResult.vue'
import TrackingPage from '@/components/TrackingPage.vue'
import LogIn from '@/components/LogIn.vue'
import RequestsData from '@/components/RequestsData.vue'
import ClientResult from '@/components/ClientResult.vue'
import ResourcesData from '@/components/ResourcesData.vue'
import TrackingPageWorker from '@/components/TrackingPageWorker.vue'
import ViewResultWorker from '@/components/ViewResultWorker.vue'

async function authGuard(to, from, next) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    console.log('No user found, redirecting to login')
    next('/login')
  } else {
    console.log('User found, continuing navigation')
    next()
  }
}

async function loginGuard(to, from, next) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    console.log('No user logged in, continue to login page')
    next()
  } else {
    console.log('User already logged in, redirecting to /requestsdata')
    next('/requestsdata') // Redirect to /requestsdata if logged in
  }
}

const routes = [
  { path: '/', component: LandingPage },
  { path: '/client-info', component: ClientInfo },
  { path: '/client-request', component: ClientRequest },
  { path: '/viewresult', component: ViewResult },
  { path: '/tracking', component: TrackingPage },
  { path: '/login', component: LogIn, beforeEnter: loginGuard },
  { path: '/requestsdata', component: RequestsData, beforeEnter: authGuard },
  { path: '/clientresult', component: ClientResult, beforeEnter: authGuard },
  { path: '/resourcesdata', component: ResourcesData, beforeEnter: authGuard },
  { path: '/trackingpageworker', component: TrackingPageWorker, beforeEnter: authGuard },
  { path: '/viewresultworker', component: ViewResultWorker, beforeEnter: authGuard },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard to handle logout and prevent accessing previous pages
router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if the user is logged out and prevent access to previous pages
  if (!user && from.name) {
    console.log('User logged out, redirecting to login page')
    next('/login') // Redirect to login page if the user is not logged in
  } else {
    next() // Proceed with the navigation if the user is logged in
  }
})

export default router
