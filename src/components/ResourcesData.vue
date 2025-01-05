<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../utils/supabaseClient' // Ensure this path is correct
import { useRouter } from 'vue-router'

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
  VMain,
  VSpacer,
  VProgressLinear,
  VChip,
  VDataTable,
  VToolbar,
  VToolbarTitle,
  VDivider,
  VPagination,
  VBtn,
} from 'vuetify/components'

const theme = ref('light')
const resourcesData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const headers = [
  { text: 'Type', value: 'res_type' },
  { text: 'Name', value: 'name' },
  { text: 'Address', value: 'location' },
  { text: 'Contact', value: 'contact' },
  { text: 'Quantity', value: 'units' },
]

const router = useRouter()

onMounted(async () => {
  loading.value = true
  const { data, error } = await supabase.from('resources').select('*')
  loading.value = false

  if (error) {
    console.error('Error fetching resources data:', error)
    alert('Failed to fetch resources data. Please try again.')
    return
  }

  resourcesData.value = data
})

function getResourceTypeColor(type) {
  switch (type) {
    case 'Food Assistance':
      return 'green'
    case 'Housing':
      return 'blue'
    case 'Money Assistance':
      return 'orange'
    case 'Guidance':
      return 'purple'
    default:
      return 'grey'
  }
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h2 class="white--text">Resources Overview</h2>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
      <v-btn text class="white--text" @click="router.push('/requestsdata')"> Requests </v-btn>
      <v-btn text class="white--text" @click="router.push('/login')"> Logout </v-btn>
    </v-app-bar>

    <v-main
      style="
        background-image: url('/background-forms.jpg');
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
                <v-text-field v-model="search" label="Search Resources" class="mb-4" outlined />
                <v-data-table
                  v-model:page="currentPage"
                  :items="resourcesData"
                  :headers="headers"
                  class="elevation-1"
                  :search="search"
                  :items-per-page="itemsPerPage"
                >
                  <template #top>
                    <v-toolbar flat>
                      <v-toolbar-title>Resources Data</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical />
                      <v-spacer />
                    </v-toolbar>
                  </template>
                  <template #item="{ item }">
                    <tr>
                      <td>
                        <v-chip :color="getResourceTypeColor(item.res_type)" dark>
                          {{ item.res_type }}
                        </v-chip>
                      </td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.location }}</td>
                      <td>{{ item.contact }}</td>
                      <td>{{ item.units }}</td>
                    </tr>
                  </template>
                </v-data-table>
                <v-pagination
                  v-model="currentPage"
                  :length="Math.ceil(resourcesData.length / itemsPerPage)"
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
  color: white !important;
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
