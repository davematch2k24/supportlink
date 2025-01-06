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

async function authGuard(to, from, next) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    console.log('No user found or error occurred:', error)
    next('/login')
  } else {
    console.log('User found:', user)
    next()
  }
}

const routes = [
  { path: '/', component: LandingPage },
  { path: '/client-info', component: ClientInfo },
  { path: '/client-request', component: ClientRequest },
  { path: '/viewresult', component: ViewResult },
  { path: '/tracking', component: TrackingPage },
  { path: '/login', component: LogIn },
  { path: '/requestsdata', component: RequestsData, beforeEnter: authGuard },
  { path: '/clientresult', component: ClientResult, beforeEnter: authGuard },
  { path: '/resourcesdata', component: ResourcesData, beforeEnter: authGuard },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router // Ensure this is a default export
