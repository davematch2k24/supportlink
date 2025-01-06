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
const statuses = ['Rejected', 'Approved'] // Removed 'Onprocess'
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
      return
    }
    clientData.value = clientDataResponse
  } catch (err) {
    console.error('Unhandled error:', err.message)
  }
}

// Function to update the request status
async function updateStatus(status) {
  if (
    !requestData.value.tracking_number ||
    requestData.value.req_status === 'Rejected' ||
    requestData.value.req_status === 'Approved'
  ) {
    return
  }

  let updateData = { req_status: status }

  // Update date_of_comp when status is 'Rejected' or 'Approved'
  if ((status === 'Rejected' || status === 'Approved') && !requestData.value.date_of_comp) {
    updateData.date_of_comp = new Date().toISOString()
  }

  const { error } = await supabase
    .from('requests')
    .update(updateData)
    .eq('tracking_number', requestData.value.tracking_number)

  if (error) {
    console.error('Error updating request status:', error)
    return
  }

  requestData.value.req_status = status
}

onMounted(() => {
  const trackingNumber = route.query.trackingNumber
  if (trackingNumber) {
    fetchRequestAndClientData(trackingNumber)
  }
})

function goBack() {
  router.back()
}

function formatDate(date) {
  if (!date) return 'Pending'

  // Parse the input date string
  const providedDate = new Date(date)

  // Adjust the time by subtracting 4 hours for the correct timezone
  const adjustedDate = new Date(providedDate.getTime() + 8 * 60 * 60000)

  // Format the date into "Monday, January 6, 2025, 1:10 A.M."
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  return adjustedDate.toLocaleString('en-US', options)
}

function getStatusColor(status) {
  switch (status) {
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
    <v-app-bar
      class="px-4"
      style="
        background-image: url('/src/assets/images/worker.jpg');
        background-size: cover;
        color: white;
        padding-left: 0;
      "
    >
      <v-container>
        <v-row class="d-flex align-center" style="width: 100%; padding: 0">
          <v-btn
            text
            class="back-btn"
            style="font-size: 18px; color: white; margin-left: 0"
            @click="goBack"
          >
            Back
          </v-btn>
          <v-spacer />
          <strong style="font-size: 16px">
            Tracking Number: {{ requestData.tracking_number }}
          </strong>
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
          <v-col cols="12" md="6">
            <v-card class="mx-auto py-5 px-6" elevation="4" style="max-width: 750px">
              <div class="info-section">
                <p><strong style="font-size: 16px">Full Name:</strong> {{ clientData.name }}</p>
                <p>
                  <strong style="font-size: 16px">Phone:</strong> {{ clientData.contact_number }}
                </p>
                <p><strong style="font-size: 16px">Email:</strong> {{ clientData.email }}</p>
                <p><strong style="font-size: 16px">Address:</strong> {{ clientData.address }}</p>
                <p>
                  <strong style="font-size: 16px">Family:</strong> {{ clientData.family_count }}
                </p>
              </div>
              <v-divider />
              <div class="info-section">
                <p><strong style="font-size: 16px">Type:</strong> {{ requestData.req_type }}</p>
                <p>
                  <strong style="font-size: 16px">Purpose:</strong> {{ requestData.req_purpose }}
                </p>
              </div>
              <v-divider />
              <div class="info-section">
                <p class="request-status" style="font-size: 16px">
                  <strong>Status:</strong>
                  <span :class="(requestData.req_status || 'Pending').toLowerCase()">
                    <span
                      class="circle"
                      :style="{ backgroundColor: getStatusColor(requestData.req_status) }"
                    />
                    {{ requestData.req_status || 'Pending' }}
                  </span>
                </p>
                <!-- Display dates if available -->
                <p v-if="requestData.date_of_req" style="font-size: 16px">
                  <strong>Request Date:</strong> {{ formatDate(requestData.date_of_req) }}
                </p>
                <p v-if="requestData.date_of_cater" style="font-size: 16px">
                  <strong>Service Date:</strong> {{ formatDate(requestData.date_of_cater) }}
                </p>
                <p v-if="requestData.date_of_comp" style="font-size: 16px">
                  <strong>Completed:</strong> {{ formatDate(requestData.date_of_comp) }}
                </p>
              </div>
              <v-divider />
              <div class="info-section">
                <h5 style="font-size: 18px">Change Status</h5>
                <v-btn
                  v-for="status in statuses"
                  :key="status"
                  :color="getStatusColor(status)"
                  :disabled="
                    requestData?.req_status === 'Rejected' || requestData?.req_status === 'Approved'
                  "
                  style="font-size: 14px; padding: 8px 14px; margin: 4px"
                  @click="confirmStatusChange(status)"
                >
                  {{ status }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline" style="font-size: 16px">
          Confirm Status Change
        </v-card-title>
        <v-card-text style="font-size: 14px">
          Are you sure you want to change the status to {{ dialogStatus }}?
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

    <v-footer
      border
      app
      style="background-image: url('/src/assets/images/worker.jpg'); background-size: cover"
    >
      <v-container>
        <v-row justify="space-between" style="margin: 0; padding: 0">
          <v-col cols="12" sm="6" class="text-center text-sm-start">
            <span style="font-size: 14px">© 2024 - SupportLink | All Rights Reserved</span>
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-sm-end">
            <a href="/privacy-policy" class="footer-link" style="font-size: 14px">Privacy Policy</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/terms-of-service" class="footer-link" style="font-size: 14px"
              >Terms of Service</a
            >
            <span class="footer-divider mx-2">|</span>
            <a href="/faqs" class="footer-link" style="font-size: 14px">FAQs</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/feedback" class="footer-link" style="font-size: 14px">Feedback</a>
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
  background-size: cover !important;
  color: white !important;
}

.v-main {
  background-color: #f0f2f5 !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-size: cover !important;
  color: white !important;
}

.footer-link {
  color: white;
  font-size: 14px;
  text-decoration: none;
}

.footer-divider {
  color: white;
}

.v-btn {
  font-size: 14px;
}

.v-card {
  margin-top: -35px; /* Removed margin-top to bring card closer to header */
}

.info-section {
  font-size: 16px;
  margin-bottom: 16px;
}

.request-status .circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.request-status .pending {
  color: orange;
}

.request-status .rejected {
  color: red;
}

.request-status .approved {
  color: green;
}

.v-row {
  max-width: 800px;
  margin: 0 auto;
}
</style>
