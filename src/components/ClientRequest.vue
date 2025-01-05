<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'

// Import Vuetify components
import {
  VApp,
  VAppBar,
  VContainer,
  VRow,
  VCol,
  VFooter,
  VSheet,
  VSelect,
  VTextarea,
  VBtn,
  VForm,
  VMain,
  VSpacer,
} from 'vuetify/components'

const theme = ref('light')
const formData = ref({
  requestType: '',
  requestPurpose: '',
})
const loading = ref(false)
const router = useRouter()

function generateTrackingNumber() {
  return 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

async function handleSubmit() {
  if (!formData.value.requestType || !formData.value.requestPurpose) {
    alert('Please fill out all required fields.')
    return
  }

  // Retrieve client information from localStorage
  const clientInfo = JSON.parse(localStorage.getItem('firstPageData'))

  // Ensure clientInfo contains the necessary fields
  if (!clientInfo || !clientInfo.emailAddress) {
    alert('Client information is missing or incomplete.')
    return
  }

  // Generate a unique tracking number
  const trackingNumber = generateTrackingNumber()

  // Insert data into Supabase
  loading.value = true
  const { error } = await supabase.from('requests').insert([
    {
      client_id: clientInfo.id, // Assuming client info has an id
      req_type: formData.value.requestType,
      req_purpose: formData.value.requestPurpose,
      req_status: 'pending',
      tracking_number: trackingNumber,
      date_of_req: new Date().toISOString(),
    },
  ])
  loading.value = false

  if (error) {
    console.error('Error uploading data:', error.message)
    alert('Failed to upload data. Please try again.')
    return
  }

  // Save request data and tracking number to localStorage
  localStorage.setItem('secondPageData', JSON.stringify(formData.value))
  localStorage.setItem('trackingNumber', trackingNumber)

  // Navigate to the ViewResult page with the tracking number as a query parameter
  router.push({ path: '/viewresult', query: { trackingNumber } })
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white; margin-bottom: 0">
      <v-container>
        <h2 class="white--text" style="margin: 0">Request Information Form</h2>
      </v-container>
      <v-spacer />
    </v-app-bar>

    <v-main
      style="
        background-image: url('/src/assets/images/background-forms.jpg');
        background-size: cover;
        background-position: center;
        padding-bottom: 0;
        margin-bottom: 0;
      "
    >
      <v-container style="padding-bottom: 0; margin-bottom: 0">
        <v-row justify="center" style="margin-bottom: 0">
          <v-col cols="12" md="8">
            <v-sheet class="mx-auto py-3 px-3" elevation="3">
              <h3 class="text-center" style="margin: 0 0 4px 0">Request Information</h3>
              <v-form @submit.prevent="handleSubmit">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="formData.requestType"
                      :items="['Money Assistance', 'Food Assistance', 'Housing', 'Guidance']"
                      label="Request Type"
                      required
                      style="margin: 0 0 4px 0"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.requestPurpose"
                      label="Request Purpose"
                      required
                      style="margin: 0 0 4px 0"
                    />
                  </v-col>
                </v-row>
                <v-btn
                  class="mt-1"
                  type="submit"
                  block
                  style="background-color: #ff8c00; color: white; margin: 0"
                >
                  Submit
                </v-btn>
              </v-form>
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
            <span>© 2024 - SupportLink | All Rights Reserved</span>
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
</style>
