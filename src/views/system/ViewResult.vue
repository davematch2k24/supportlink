<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../../utils/supabase' // Adjusted import path

const theme = ref('light')
const trackingNumber = ref('')
const resultData = ref({})

const route = useRoute()

onMounted(async () => {
  trackingNumber.value = route.query.trackingNumber
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('tracking_number', trackingNumber.value)
    .single()

  if (error) {
    console.error('Error fetching data:', error)
    alert('Failed to fetch data. Please try again.')
    return
  }

  const clientData = JSON.parse(localStorage.getItem('firstPageData')) || {}
  resultData.value = {
    ...clientData,
    requestType: data.req_type,
    requestPurpose: data.req_purposes,
    status: data.req_status,
    trackingNumber: data.tracking_number,
  }
})
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
        <v-container>
          <v-row>
            <v-col cols="12" class="text-left">
              <h2 class="white--text">
                <strong>Tracking Number: {{ trackingNumber }}</strong>
              </h2>
            </v-col>
          </v-row>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        class="d-flex justify-center align-center"
        style="
          background-image: url('/public/background-forms.jpg');
          background-size: cover;
          background-position: center;
          padding: 10px 0;
        "
      >
        <v-container class="fill-height">
          <v-row class="d-flex justify-center align-center">
            <v-col cols="12" md="8">
              <v-sheet class="mx-auto py-1 px-4" elevation="3" style="max-width: 800px">
                <div class="info-section">
                  <p><strong>Full Name:</strong> {{ resultData.fullName }}</p>
                  <p><strong>Phone Number:</strong> {{ resultData.phoneNumber }}</p>
                  <p><strong>Email Address:</strong> {{ resultData.emailAddress }}</p>
                  <p><strong>Home Address:</strong> {{ resultData.homeAddress }}</p>
                  <p>
                    <strong>Number of Family Members:</strong>
                    {{ resultData.numberOfFamilyMembers }}
                  </p>
                </div>
                <v-divider></v-divider>
                <div class="info-section">
                  <p><strong>Request Type:</strong> {{ resultData.requestType }}</p>
                  <p><strong>Request Purpose:</strong> {{ resultData.requestPurpose }}</p>
                </div>
                <v-divider></v-divider>
                <div class="info-section">
                  <p class="request-status">
                    <strong>Request Status:</strong>
                    <span :class="(resultData.status || 'pending').toLowerCase()">
                      <span class="circle"></span> {{ resultData.status || 'Pending' }}</span
                    >
                  </p>
                </div>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer border app style="background-color: #ff8c00; padding: 0">
        <v-container>
          <v-row justify="space-between" style="margin: 0; padding: 0">
            <v-col cols="12" sm="6" class="text-center text-sm-start">
              <span>Copyright © 2024 - SupportLink | All Rights Reserved</span>
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
  background-image: url('/public/background-forms.jpg') !important;
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
  padding: 50px; /* Increased padding */
  max-width: 800px; /* Increased max-width */
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 36px; /* Increased font size */
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 25px; /* Increased gap */
}

.signup-link {
  margin-top: 20px;
  font-size: 1.2rem; /* Increased font size */
  text-align: left;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.tracking-number {
  font-size: 28px; /* Increased font size */
  margin-bottom: 20px;
}

.info-section {
  margin: 30px 0; /* Added more margin */
  font-size: 20px; /* Increased font size */
}

.request-status {
  font-size: 22px; /* Increased font size */
  font-weight: bold;
  display: flex;
  align-items: center;
}

.circle {
  display: inline-block;
  width: 20px; /* Increased size */
  height: 20px; /* Increased size */
  border-radius: 50%;
  margin-left: 10px; /* Added space before the circle */
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
