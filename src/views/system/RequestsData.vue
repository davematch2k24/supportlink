<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabaseClient' // Ensure this path is correct
import { useRouter } from 'vue-router'
import { logout, user, logActivity } from '@/utils/authService' // Ensure this path is correct
import Notifications from '@/components/navigation/UserNotifications.vue' // Ensure this path is correct

const theme = ref('light')
const requestsData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const headers = [
  { text: 'Client ID', value: 'c_id' },
  { text: 'Request Type', value: 'req_type' },
  { text: 'Request Purpose', value: 'req_purposes' },
  { text: 'Request Status', value: 'req_status' },
  { text: 'Date of Request', value: 'date_of_req' },
  { text: 'Tracking Number', value: 'tracking_number' },
  { text: 'Actions', value: 'actions', sortable: false },
]

const router = useRouter()

onMounted(async () => {
  loading.value = true
  const { data, error } = await supabase.from('requests').select('*')
  loading.value = false

  if (error) {
    console.error('Error fetching requests data:', error)
    alert('Failed to fetch requests data. Please try again.')
    return
  }

  requestsData.value = data
})

async function updateRequestStatus(requestId, status) {
  const { error } = await supabase
    .from('requests')
    .update({ req_status: status })
    .eq('id', requestId)

  if (error) {
    console.error('Error updating request status:', error)
    alert('Failed to update request status. Please try again.')
    return
  }

  // Refresh data
  loading.value = true
  const { data, error: fetchError } = await supabase.from('requests').select('*')
  loading.value = false

  if (fetchError) {
    console.error('Error fetching requests data:', fetchError)
    alert('Failed to fetch requests data. Please try again.')
    return
  }

  requestsData.value = data
  await logActivity(`Updated request status to ${status} for request ID ${requestId}`)
}

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
          <h2 class="white--text">Requests Overview</h2>
        </v-container>
        <v-spacer></v-spacer>
        <v-btn text @click="navigateTo('requestsdata')" class="white--text">Requests</v-btn>
        <v-btn text @click="navigateTo('resourcesdata')" class="white--text">Resources</v-btn>
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
                    label="Search Requests"
                    class="mb-4"
                  ></v-text-field>
                  <v-data-table
                    :items="requestsData"
                    :headers="headers"
                    class="elevation-1"
                    :search="search"
                    :items-per-page="itemsPerPage"
                    v-model:page="currentPage"
                  >
                    <template #top>
                      <v-toolbar flat>
                        <v-toolbar-title>Requests Data</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </template>
                    <template #item="{ item }">
                      <tr>
                        <td>{{ item.c_id }}</td>
                        <td>{{ item.req_type }}</td>
                        <td>{{ item.req_purposes }}</td>
                        <td>
                          <v-chip
                            :color="
                              item.req_status === 'pending'
                                ? 'orange'
                                : item.req_status === 'approved'
                                  ? 'green'
                                  : 'red'
                            "
                            dark
                          >
                            {{ item.req_status }}
                          </v-chip>
                        </td>
                        <td>{{ item.date_of_req }}</td>
                        <td>{{ item.tracking_number }}</td>
                        <td v-if="user.value.role === 'admin' || user.value.role === 'worker'">
                          <v-menu>
                            <template #activator="{ on, attrs }">
                              <v-btn small icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item @click="updateRequestStatus(item.id, 'pending')">
                                <v-list-item-title>Set as Pending</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="updateRequestStatus(item.id, 'approved')">
                                <v-list-item-title>Set as Approved</v-list-item-title>
                              </v-list-item>
                              <v-list-item @click="updateRequestStatus(item.id, 'rejected')">
                                <v-list-item-title>Set as Rejected</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-pagination
                    v-model="currentPage"
                    :length="Math.ceil(requestsData.length / itemsPerPage)"
                    :total-visible="5"
                    class="mt-4"
                  ></v-pagination>
                </template>
              </v-sheet>
            </v-col>
            <!-- Notifications Sidebar -->
            <v-col cols="12" md="4">
              <Notifications />
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
</style>
