<template>
  <v-app :theme="theme">
    <!-- Top Bar with Track Number Button -->
    <v-app-bar
      class="px-3"
      style="background-image: url('/src/assets/images/worker.jpg'); color: white"
    >
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="auto">
            <h2 class="white--text">Requests Overview</h2>
          </v-col>
          <v-col cols="auto">
            <v-btn text class="white--text" @click="router.push('/tracking')"> Track Number </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
      <v-btn text class="white--text" @click="router.push('/resourcesdata')"> Resources </v-btn>
      <v-btn text class="white--text" @click="router.push('/login')"> Logout </v-btn>
    </v-app-bar>

    <!-- Main Content -->
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
            <v-sheet elevation="1" class="mx-auto my-12 py-8 px-6" rounded="lg">
              <v-progress-linear v-if="loading" indeterminate color="orange" />
              <template v-else>
                <v-text-field v-model="search" label="Search Requests" class="mb-4" outlined />
                <!-- Data Table -->
                <v-data-table
                  v-model:page="currentPage"
                  :items="requestsData"
                  :headers="headers"
                  class="elevation-1"
                  :search="search"
                  :items-per-page="itemsPerPage"
                >
                  <!-- Header Section -->
                  <thead>
                    <tr>
                      <th class="text-center fw-bold">
                        <strong> Name </strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong> Tracking Number </strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong> Worker Email </strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong> Status </strong>
                      </th>
                      <th class="text-center fw-bold">
                        <strong> Show </strong>
                      </th>
                    </tr>
                  </thead>

                  <!-- Body Section -->
                  <tbody>
                    <tr v-for="item in requestsData" :key="item.tracking_number">
                      <td class="text-center">
                        {{ item.name }}
                      </td>
                      <td class="text-center">
                        {{ item.tracking_number }}
                      </td>
                      <td class="text-center">
                        {{ item.w_email || 'Not Assigned' }}
                      </td>
                      <td class="text-center">
                        <v-chip :color="getStatusColor(item.status)" dark>
                          {{ item.status }}
                        </v-chip>
                      </td>
                      <td class="text-center">
                        <v-btn
                          small
                          color="orange"
                          @click="confirmViewRequest(item.tracking_number)"
                        >
                          View
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-data-table>

                <v-pagination
                  v-model="currentPage"
                  :length="Math.ceil((requestsData?.length || 0) / itemsPerPage)"
                  :total-visible="5"
                  class="mt-4"
                />
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Dialog for Confirm View Request -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline" style="font-size: 16px"> Confirm View Request </v-card-title>
        <v-card-text style="font-size: 14px">
          Are you sure you want to view this request?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text style="font-size: 14px" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text style="font-size: 14px" @click="handleDialogConfirm">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Footer -->
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'

const theme = ref('light')
const requestsData = ref([])
const loading = ref(false)
const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const dialog = ref(false)
const selectedTrackingNumber = ref('')
const headers = [
  { text: 'Name', value: 'name', align: 'center' },
  { text: 'Tracking Number', value: 'tracking_number', align: 'center' },
  { text: 'Worker Email', value: 'w_email', align: 'center' },
  { text: 'Status', value: 'status', align: 'center' },
  { text: 'Actions', value: 'actions', align: 'center', sortable: false },
]

const router = useRouter()

onMounted(async () => {
  loading.value = true
  try {
    const { data: clientsData, error: clientsError } = await supabase
      .from('clients')
      .select('id, name')
    if (clientsError) throw clientsError

    const { data: requestsDataRaw, error: requestsError } = await supabase
      .from('requests')
      .select('id, client_id, tracking_number, req_status, w_email')
    if (requestsError) throw requestsError

    const combinedData = requestsDataRaw.map((request) => {
      const client = clientsData.find((client) => client.id === request.client_id)
      return {
        ...request,
        name: client ? client.name : 'Unknown',
        status: request.req_status,
        w_email: request.w_email,
      }
    })
    requestsData.value = combinedData
  } catch (error) {
    console.error('Error fetching data:', error)
    alert('Failed to fetch data. Please try again.')
  } finally {
    loading.value = false
  }
})

function confirmViewRequest(trackingNumber) {
  selectedTrackingNumber.value = trackingNumber
  dialog.value = true
}

async function handleDialogConfirm() {
  const user = await supabase.auth.getUser()
  if (user.error) {
    console.error('Error fetching user:', user.error)
    alert('Failed to fetch user. Please try again.')
    return
  }

  const email = user.data.user.email
  const dateOfCater = new Date().toISOString()

  const { data: requestData, error: requestError } = await supabase
    .from('requests')
    .select('req_status')
    .eq('tracking_number', selectedTrackingNumber.value)
    .single()
  if (requestError) {
    console.error('Error fetching request status:', requestError)
    alert('Failed to fetch request status. Please try again.')
    return
  }

  if (requestData.req_status === 'Approved' || requestData.req_status === 'Rejected') {
    alert(
      'This request has already been approved or rejected and cannot be updated. Check Tracking Number for details.'
    )
    return
  }

  const updateData = {
    req_status: 'Onprocess',
    w_email: email,
  }
  if (requestData.req_status !== 'Onprocess') {
    updateData.date_of_cater = dateOfCater
  }

  const { error } = await supabase
    .from('requests')
    .update(updateData)
    .eq('tracking_number', selectedTrackingNumber.value)
  if (error) {
    console.error('Error updating request:', error)
    alert('Failed to update request. Please try again.')
    return
  }

  dialog.value = false
  router.push({ path: '/clientresult', query: { trackingNumber: selectedTrackingNumber.value } })
}

function getStatusColor(status) {
  switch (status) {
    case 'Pending':
      return 'orange'
    case 'Onprocess':
      return 'blue'
    case 'Rejected':
      return 'red'
    case 'Approved':
      return 'green'
    default:
      return 'grey'
  }
}
</script>

<style scoped>
body {
  overflow: hidden;
}

.v-app-bar {
  background-image: url('/src/assets/images/worker.jpg') !important;
  color: white !important;
}

.v-main {
  background-image: url('/src/assets/images/background-forms.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-image: url('/src/assets/images/worker.jpg') !important;
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

.v-data-table th {
  padding-top: 0 !important;
  margin-top: 0 !important;
  vertical-align: top !important;
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
