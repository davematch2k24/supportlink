<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../utils/supabaseClient' // Ensure this is the correct path

const theme = ref('light')
const formData = ref({
  requestType: '',
  requestPurpose: '',
})

const requestTypes = ['Money Assistance', 'Food', 'Housing', 'Guidance'] // Predefined request types

const rules = {
  required: (value) => !!value || 'This field is required.',
}

const router = useRouter()

async function handleSubmit() {
  if (!formData.value.requestType || !formData.value.requestPurpose) {
    alert('Please fill out all required fields.')
    return
  }

  const trackingNumber = localStorage.getItem('trackingNumber') // Retrieve the tracking number from localStorage
  const dateOfRequest = new Date().toISOString() // Automatically fill in the date and time of the request

  console.log('Form Data:', JSON.parse(JSON.stringify(formData.value))) // Extract raw data

  try {
    const { data, error } = await supabase.from('requests').insert([
      {
        tracking_number: trackingNumber,
        req_type: formData.value.requestType,
        req_purpose: formData.value.requestPurpose,
        req_status: 'pending', // Default status
        date_of_req: dateOfRequest,
        date_completion: null, // Leave null initially
        date_process: null, // Leave null initially
        workers_id: null, // Leave null initially
      },
    ])

    console.log('Supabase Response:', { data, error })

    if (error) {
      console.error('Error uploading data:', error.message)
      alert('Failed to upload data. Please try again.')
      return
    }

    alert('Request submitted successfully!')
    router.push('/requestsdata')
  } catch (err) {
    console.error('Error in handleSubmit function:', err.message)
    alert('Failed to upload data. Please try again.')
  }
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white; margin-bottom: 0">
        <v-container>
          <h2 class="white--text" style="margin: 0">Client Request Form</h2>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        style="
          background-image: url('/public/background-forms.jpg');
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
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="formData.requestType"
                        :items="requestTypes"
                        :rules="[rules.required]"
                        label="Request Type"
                        style="margin: 0 0 4px 0"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.requestPurpose"
                        :rules="[rules.required]"
                        label="Request Purpose"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="mt-1"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white; margin: 0"
                    >Submit</v-btn
                  >
                </v-form>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Footer Section -->
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
</style>
