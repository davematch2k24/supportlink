<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient' // Ensure this path is correct
import { logout } from '@/utils/authService' // Ensure this path is correct

const theme = ref('light')
const resourcesData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

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

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
        <v-container>
          <h2 class="white--text">Resources Overview</h2>
        </v-container>
        <v-spacer></v-spacer>
        <v-btn text @click="router.push('/requestsdata')" class="white--text">Requests</v-btn>
        <v-btn text @click="router.push('/resourcesdata')" class="white--text">Resources</v-btn>
        <v-btn text @click="handleLogout" class="white--text">Logout</v-btn>
      </v-app-bar>

      <v-main style="background-color: #f0f2f5; padding-bottom: 0; margin-bottom: 0">
        <v-container style="padding-bottom: 0; margin-bottom: 0">
          <v-row justify="center" style="margin-bottom: 0">
            <v-col cols="12" md="8">
              <v-sheet
                class="mx-auto py-4 px-4"
                elevation="2"
                rounded="lg"
                style="background-color: white"
              >
                <v-progress-linear v-if="loading" indeterminate color="orange"></v-progress-linear>
                <template v-else>
                  <v-text-field
                    v-model="search"
                    label="Search Resources"
                    class="mb-4"
                  ></v-text-field>
                  <table class="resources-table">
                    <thead>
                      <tr>
                        <th class="text-center">Name</th>
                        <th class="text-center">Type</th>
                        <th class="text-center">Address</th>
                        <th class="text-center">Contact</th>
                        <th class="text-center">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in resourcesData" :key="item.id">
                        <td class="text-center">{{ item.name }}</td>
                        <td class="text-center">{{ item.type }}</td>
                        <td class="text-center">{{ item.address }}</td>
                        <td class="text-center">{{ item.res_contact }}</td>
                        <td class="text-center">{{ item.qty }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <v-pagination
                    v-model="currentPage"
                    :length="Math.ceil(resourcesData.length / itemsPerPage)"
                    :total-visible="5"
                    class="mt-4"
                  ></v-pagination>
                </template>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer style="background-color: #ff8c00" border app>
        <v-container>
          <v-row justify="space-between">
            <!-- Left-aligned text -->
            <v-col cols="12" sm="6" class="text-center text-sm-start">
              <span>Copyright © 2024 - SupportLink | All Rights Reserved</span>
            </v-col>

            <!-- Right-aligned links in a single line -->
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
  </v-responsive>
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
  background-color: #f0f2f5 !important;
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

.resources-table {
  width: 100%;
  margin-bottom: 16px;
  border-collapse: collapse;
}

.resources-table th,
.resources-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.resources-table th {
  background-color: #f2f2f2;
  color: black;
  text-align: center;
}

.text-center {
  text-align: center;
}
</style>
