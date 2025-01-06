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
  VBtn,
  VMain,
  VSpacer,
  VProgressLinear,
  VChip,
  VTable,
} from 'vuetify/components'

const theme = ref('light')
const resourcesData = ref([])
const loading = ref(false)
const search = ref('')

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

function logout() {
  supabase.auth
    .signOut()
    .then(() => {
      // After logout, redirect to login page
      router.push('/login')
    })
    .catch((error) => {
      console.error('Logout error:', error)
      alert('An error occurred during logout. Please try again.')
    })
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar
      class="px-3"
      style="background-image: url('/src/assets/images/worker.jpg'); color: white"
    >
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h2 class="white--text">Resources Overview</h2>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
      <v-btn text class="white--text" @click="router.push('/requestsdata')"> Requests </v-btn>
      <v-btn text class="white--text" @click="logout"> Logout </v-btn>
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
          <v-col cols="12" md="10">
            <v-sheet elevation="1" class="mx-auto my-12 py-8 px-6" rounded="lg">
              <v-progress-linear v-if="loading" indeterminate color="orange" />
              <template v-else>
                <v-text-field v-model="search" label="Search Resources" class="mb-4" outlined />

                <!-- Data Table -->
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-center fw-bold">
                        <strong>Type</strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong>Name</strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong>Location</strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong>Contact</strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong>Quantity</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in resourcesData" :key="item.id">
                      <td class="text-center">
                        <v-chip :color="getResourceTypeColor(item.res_type)" dark>
                          {{ item.res_type }}
                        </v-chip>
                      </td>
                      <td class="text-center">
                        {{ item.description }}
                      </td>
                      <td class="text-center">
                        {{ item.location }}
                      </td>
                      <td class="text-center">
                        {{ item.contact }}
                      </td>
                      <td class="text-center">
                        {{ item.units }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer style="background-image: url('/src/assets/images/worker.jpg'); color: white" app>
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
  background-image: url('/src/assets/images/worker.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  color: white !important;
}

.v-main {
  background-image: url('/src/assets/images/background-forms.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-image: url('/src/assets/images/worker.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
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
  margin-top: 0;
}

.v-table th,
.v-table td {
  text-align: center;
}

.v-table th {
  font-weight: bold;
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

.text-center {
  text-align: center;
}

.fw-bold {
  font-weight: bold;
}

.mb-4 {
  margin-bottom: 1rem !important;
}
</style>
