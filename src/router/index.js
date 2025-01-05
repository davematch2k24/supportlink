// Composables
import { createRouter, createWebHistory } from 'vue-router'

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

const routes = [
  { path: '/', component: LandingPage },
  { path: '/client-info', component: ClientInfo },
  { path: '/client-request', component: ClientRequest },
  { path: '/viewresult', component: ViewResult },
  { path: '/tracking', component: TrackingPage },
  { path: '/login', component: LogIn },
  { path: '/requestsdata', component: RequestsData },
  { path: '/clientresult', component: ClientResult },
  { path: '/resourcesdata', component: ResourcesData },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
