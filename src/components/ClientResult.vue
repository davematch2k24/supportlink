<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'
import {
  VApp,
  VAppBar,
  VContainer,
  VRow,
  VCol,
  VFooter,
  VSheet,
  VMain,
  VProgressLinear,
  VChip,
  VBtn,
  VDivider,
  VSpacer,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
} from 'vuetify/components'

// Display Data
const clientData = ref({})
const requestData = ref({})
const statuses = ['Pending', 'Onprocess', 'Rejected', 'Approved']
const dialog = ref(false)
const dialogStatus = ref('')

const route = useRoute()
const router = useRouter()

// Function to fetch request and client data
async function fetchRequestAndClientData(trackingNumber) {
  try {
    const { data: requestDataResponse, error: requestError } = await supabase
      .from('requests')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()

    if (requestError) {
      console.error('Error fetching request data:', requestError.message)
      alert('Failed to fetch request data. Please try again.')
      return
    }
    requestData.value = requestDataResponse

    const { data: clientDataResponse, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', requestData.value.client_id)
      .single()

    if (clientError) {
      console.error('Error fetching client data:', clientError.message)
      alert('Failed to fetch client data. Please try again.')
      return
    }
    clientData.value = clientDataResponse
  } catch (err) {
    console.error('Unhandled error:', err.message)
    alert('An unexpected error occurred. Please try again.')
  }
}

async function updateStatus(status) {
  if (
    !requestData.value.tracking_number ||
    requestData.value.req_status === 'Rejected' ||
    requestData.value.req_status === 'Approved'
  ) {
    return
  }

  const { error } = await supabase
    .from('requests')
    .update({ req_status: status })
    .eq('tracking_number', requestData.value.tracking_number)

  if (error) {
    console.error('Error updating request status:', error)
    alert('Failed to update request status. Please try again.')
    return
  }

  requestData.value.req_status = status
  alert(`Request status updated to ${status}.`)
}

onMounted(() => {
  const trackingNumber = route.query.trackingNumber
  if (trackingNumber) {
    fetchRequestAndClientData(trackingNumber)
  }
})

function goHome() {
  router.push('/')
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

function confirmStatusChange(status) {
  dialogStatus.value = status
  dialog.value = true
}

function handleDialogConfirm() {
  updateStatus(dialogStatus.value)
  dialog.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
      <v-container>
        <v-row class="d-flex align-center">
          <strong>Tracking Number: {{ requestData.tracking_number }}</strong>
          <v-spacer />
          <div>
            <v-btn icon class="home-btn" @click="goHome">
              <v-icon color="white"> mdi-home </v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main
      class="d-flex justify-center align-center"
      style="
        background-image: url('/src/assets/images/background-forms.jpg');
        background-size: cover;
        background-position: center;
        padding: 10px 0;
      "
    >
      <v-container class="fill-height">
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" md="8">
            <v-card class="mx-auto py-1 px-4" elevation="3" style="max-width: 800px">
              <div class="info-section">
                <p><strong>Full Name:</strong> {{ clientData.name }}</p>
                <p><strong>Phone Number:</strong> {{ clientData.contact_number }}</p>
                <p><strong>Email Address:</strong> {{ clientData.email }}</p>
                <p><strong>Home Address:</strong> {{ clientData.address }}</p>
                <p><strong>Number of Family Members:</strong> {{ clientData.family_count }}</p>
              </div>
              <v-divider />
              <div class="info-section">
                <p><strong>Request Type:</strong> {{ requestData.req_type }}</p>
                <p><strong>Request Purpose:</strong> {{ requestData.req_purpose }}</p>
              </div>
              <v-divider />
              <div class="info-section">
                <p class="request-status">
                  <strong>Request Status:</strong>
                  <span :class="(requestData.req_status || 'pending').toLowerCase()">
                    <span class="circle" /> {{ requestData.req_status || 'Pending' }}
                  </span>
                </p>
              </div>
              <div class="info-section">
                <p><strong>Date of Request:</strong> {{ requestData.date_of_req }}</p>
              </div>
              <v-divider />
              <div class="info-section">
                <h3>Change Status</h3>
                <v-btn
                  v-for="status in statuses"
                  :key="status"
                  :color="getStatusColor(status)"
                  :disabled="
                    requestData?.req_status === 'Rejected' || requestData?.req_status === 'Approved'
                  "
                  @click="
                    status === 'Rejected' || status === 'Approved'
                      ? confirmStatusChange(status)
                      : updateStatus(status)
                  "
                >
                  {{ status }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline"> Confirm Status Change </v-card-title>
        <v-card-text>Are you sure you want to change the status to {{ dialogStatus }}?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="handleDialogConfirm"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-footer border app style="background-color: #ff8c00; padding: 0">
      <v-container>
        <v-row justify="space-between" style="margin: 0; padding: 0">
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

.home-btn:hover {
  background-color: green !important;
  color: white !important;
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

.pending .circle {
  background-color: orange;
}

.onprocess .circle {
  background-color: blue;
}

.rejected .circle {
  background-color: red;
}

.accepted .circle {
  background-color: green;
}
</style>
