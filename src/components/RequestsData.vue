<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabaseClient' // Adjusted import path

const theme = ref('light')
const requestsData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Status', value: 'req_status' },
  { text: 'Date', value: 'date_of_req' },
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

function viewRequest(requestId) {
  router.push({ path: '/clientresult', query: { id: requestId } })
}

function getStatusColor(status) {
  switch (status) {
    case 'Completed':
      return 'green'
    case 'Rejected':
      return 'red'
    case 'Processing':
      return 'blue'
    default:
      return 'orange'
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        style="background-color: #ff8c00; color: white"
      >
        <v-container>
          <h2 class="white--text">
            Requests Overview
          </h2>
        </v-container>
        <v-spacer />
        <v-btn
          text
          class="white--text"
          @click="router.push('/resourcesdata')"
        >
          Resources
        </v-btn>
        <v-btn
          text
          class="white--text"
          @click="router.push('/login')"
        >
          Logout
        </v-btn>
      </v-app-bar>

      <v-main style="background-color: #f0f2f5; padding-bottom: 0; margin-bottom: 0">
        <v-container style="padding-bottom: 0; margin-bottom: 0">
          <v-row
            justify="center"
            style="margin-bottom: 0"
          >
            <v-col
              cols="12"
              md="12"
            >
              <v-sheet
                class="mx-auto py-4 px-4"
                elevation="2"
                rounded="lg"
                style="background-color: white"
              >
                <v-progress-linear
                  v-if="loading"
                  indeterminate
                  color="orange"
                />
                <template v-else>
                  <v-text-field
                    v-model="search"
                    label="Search Requests"
                    class="mb-4"
                  />
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
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        />
                        <v-spacer />
                      </v-toolbar>
                    </template>
                    <template #item="{ item }">
                      <tr>
                        <td>{{ item.name }}</td>
                        <td>
                          <v-chip
                            :color="getStatusColor(item.req_status)"
                            dark
                          >
                            {{ item.req_status }}
                          </v-chip>
                        </td>
                        <td>{{ item.date_of_req }}</td>
                        <td>
                          <v-btn
                            small
                            color="primary"
                            @click="viewRequest(item.id)"
                          >
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

      <v-footer
        style="background-color: #ff8c00"
        border
        app
      >
        <v-container>
          <v-row justify="space-between">
            <!-- Left-aligned text -->
            <v-col
              cols="12"
              sm="6"
              class="text-center text-sm-start"
            >
              <span>Copyright © 2024 - SupportLink | All Rights Reserved</span>
            </v-col>

            <!-- Right-aligned links in a single line -->
            <v-col
              cols="12"
              sm="6"
              class="text-center text-sm-end"
            >
              <a
                href="/privacy-policy"
                class="footer-link"
              >Privacy Policy</a>
              <span class="footer-divider mx-2">|</span>
              <a
                href="/terms-of-service"
                class="footer-link"
              >Terms of Service</a>
              <span class="footer-divider mx-2">|</span>
              <a
                href="/faqs"
                class="footer-link"
              >FAQs</a>
              <span class="footer-divider mx-2">|</span>
              <a
                href="/feedback"
                class="footer-link"
              >Feedback</a>
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

.register-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
}

.register-section {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  padding: 20px;
}

.register-container {
  background: #fff;
  border-radius: 10px;
  padding: 50px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.signup-link {
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: left;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.tracking-number {
  font-size: 28px;
  margin-bottom: 20px;
}

.info-section {
  margin: 30px 0;
  font-size: 20px;
}

.request-status {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
}

/* Status circles */
.pending .circle {
  background-color: orange;
}

.ongoing .circle {
  background-color: blue;
}

.rejected .circle {
  background-color: red;
}

.accepted .circle {
  background-color: green;
}

@media (max-width: 600px) {
  .px-3 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .mt-2 {
    margin-top: 0.5rem !important;
  }
  .border.rounded {
    border-radius: 5px !important;
  }
}
</style>
