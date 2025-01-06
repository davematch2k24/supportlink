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
  VChip,
  VBtn,
  VDivider,
  VSpacer,
} from 'vuetify/components'

const theme = ref('light')
const requestData = ref({})
const clientData = ref({})
const trackingNumber = ref('')
const loading = ref(false)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  trackingNumber.value = route.query.trackingNumber
  if (!trackingNumber.value) {
    alert('Tracking number not provided.')
    return
  }

  loading.value = true
  const { data: requestDataResponse, error: requestError } = await supabase
    .from('requests')
    .select('*')
    .eq('tracking_number', trackingNumber.value)
  loading.value = false

  if (requestError) {
    console.error('Error fetching request data:', requestError.message)
    alert('Failed to fetch request data. Please try again.')
    return
  }

  if (requestDataResponse.length !== 1) {
    console.error(
      'Error fetching request data: JSON object requested, multiple (or no) rows returned'
    )
    alert('Failed to fetch request data. Please try again.')
    return
  }

  requestData.value = requestDataResponse[0]

  // Fetch client data using the foreign key
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
})

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

function getStatusColor(status, isDate) {
  if (isDate) {
    // Remove gray background and only return color when there's a valid date
    return status ? '' : ''
  }

  // For other status (like Pending, Approved, etc.)
  switch (status) {
    case 'Pending':
      return 'grey'
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

function goBack() {
  router.push('/requestsdata')
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h2 class="white--text">Request Details</h2>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
      <v-btn text class="back-btn" @click="goBack">
        <span style="font-size: 18px; color: white">Back</span>
      </v-btn>
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
          <v-col cols="12" md="8">
            <v-sheet elevation="3" class="mx-auto my-12 py-8 px-6" rounded="lg">
              <v-progress-linear v-if="loading" indeterminate color="orange" />
              <template v-else>
                <h3 class="text-center" style="margin: 0 0 4px 0">Request Summary</h3>
                <v-divider />
                <v-row>
                  <v-col cols="12">
                    <p><strong>Full Name:</strong> {{ clientData?.name }}</p>
                    <p>
                      <strong>Home Address:</strong>
                      {{ clientData?.address }}
                    </p>
                    <p>
                      <strong>Contact Number:</strong>
                      {{ clientData?.contact_number }}
                    </p>
                    <p><strong>Email Address:</strong> {{ clientData?.email }}</p>
                    <p>
                      <strong>Number of Family Members:</strong>
                      {{ clientData?.family_count }}
                    </p>
                    <p>
                      <strong>Request Type:</strong>
                      {{ requestData?.req_type }}
                    </p>
                    <p>
                      <strong>Request Purpose:</strong>
                      {{ requestData?.req_purpose }}
                    </p>
                    <p>
                      <strong>Request Status:</strong>
                      <v-chip :color="getStatusColor(requestData?.req_status)" dark>
                        {{ requestData?.req_status }}
                      </v-chip>
                    </p>
                    <p>
                      <strong>Tracking Number:</strong>
                      {{ requestData?.tracking_number }}
                    </p>
                    <p>
                      <strong>Date of Request:</strong>
                      {{ formatDate(requestData?.date_of_req) }}
                    </p>
                    <p v-if="requestData?.date_of_comp">
                      <strong>Date of Completion:</strong>
                      {{ formatDate(requestData?.date_of_comp) }}
                    </p>
                    <p v-if="requestData?.date_of_cater">
                      <strong>Date of Service:</strong>
                      {{ formatDate(requestData?.date_of_cater) }}
                    </p>
                  </v-col>
                </v-row>
              </template>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
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
  background-image: url('/src/assets/images/worker.jpg');
  background-size: cover;
  background-position: center;
  color: white !important;
}

.v-main {
  background-color: #f0f2f5 !important;
  background-image: url('/src/assets/images/background-forms.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-image: url('/src/assets/images/worker.jpg');
  background-size: cover;
  background-position: center;
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
