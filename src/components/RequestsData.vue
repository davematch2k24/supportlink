<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient' // Adjusted import path

// Import Vuetify components
import {
  VApp,
  VAppBar,
  VContainer,
  VRow,
  VCol,
  VFooter,
  VSheet,
  VTextField,
  VBtn,
  VMain,
  VSpacer,
  VProgressLinear,
  VChip,
  VDataTable,
  VToolbar,
  VToolbarTitle,
  VDivider,
  VPagination,
  VIcon, // Added VIcon import
} from 'vuetify/components'

const theme = ref('light')
const requestsData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Tracking Number', value: 'tracking_number' }, // Updated header
  { text: 'Actions', value: 'actions', sortable: false },
]

const router = useRouter()

onMounted(async () => {
  loading.value = true
  try {
    // Fetch clients data
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('id, name')

    if (clientsError) throw clientsError

    // Fetch requests data
    const { data: requestsDataRaw, error: requestsError } = await supabase
      .from('requests')
      .select('id, client_id, tracking_number')

    if (requestsError) throw requestsError

    // Combine data based on client_id
    const combinedData = requestsDataRaw.map((request) => {
      const client = clientsData.find((client) => client.id === request.client_id)
      return {
        ...request,
        name: client ? client.name : 'Unknown',
      }
    })

    console.log('Combined data:', combinedData) // Added console log to check the combined data
    requestsData.value = combinedData
  } catch (error) {
    console.error('Error fetching data:', error)
    alert('Failed to fetch data. Please try again.')
  } finally {
    loading.value = false
  }
})

function viewRequest(trackingNumber) {
  router.push({ path: '/clientresult', query: { trackingNumber } })
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h2 class="white--text">Requests Overview</h2>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
      <v-btn text class="white--text" @click="router.push('/resourcesdata')"> Resources </v-btn>
      <v-btn text class="white--text" @click="router.push('/login')"> Logout </v-btn>
    </v-app-bar>

    <v-main
      style="
        background-image: url('/src/assets/images/background-forms.jpg');
        background-size: cover;
        background-position: center;
      "
    >
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-sheet elevation="3" class="mx-auto my-12 py-8 px-6" rounded="lg">
              <v-progress-linear v-if="loading" indeterminate color="orange" />
              <template v-else>
                <v-text-field v-model="search" label="Search Requests" class="mb-4" outlined />
                <v-data-table
                  v-model:page="currentPage"
                  :items="requestsData"
                  :headers="headers"
                  class="elevation-1"
                  :search="search"
                  :items-per-page="itemsPerPage"
                >
                  <template #top>
                    <v-toolbar flat>
                      <v-toolbar-title>Requests Data</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical />
                      <v-spacer />
                    </v-toolbar>
                  </template>
                  <template #item="{ item }">
                    <tr>
                      <td>{{ item.name }}</td>
                      <!-- Displaying name from clients table -->
                      <td>{{ item.tracking_number }}</td>
                      <!-- Displaying tracking number from requests table -->
                      <td>
                        <v-btn small color="primary" @click="viewRequest(item.tracking_number)">
                          View
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <v-pagination
                  v-model="currentPage"
                  :length="Math.ceil(requestsData.length / itemsPerPage)"
                  :total-visible="5"
                  class="mt-4"
                />
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="orange" app>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" class="text-center text-sm-start">
            <span>© 2024 - SupportLink | All Rights Reserved</span>
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-sm-end">
            <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/terms-of-service" class="footer-link">Terms of Service</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/faqs" class="footer-link">FAQs</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/feedback" class="footer-link">Feedback</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
body {
  overflow: hidden;
}

.v-app-bar {
  background-color: #ff8c00 !important;
  color: white !important;
}

.v-main {
  background-image: url('/src/assets/images/background-forms.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-color: #ff8c00 !important;
  color: white !important; /* Fixed colon issue */
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-divider {
  margin: 0 8px;
  color: white;
}

.v-sheet {
  background-color: white !important;
  border-radius: 8px !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.my-12 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.py-8 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}

.px-6 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}
</style>
