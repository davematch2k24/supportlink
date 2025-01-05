<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../utils/supabaseClient' // Adjusted import path

const theme = ref('light')
const requestData = ref({})
const trackingNumber = ref('')
const statuses = ['Pending', 'Onprocess', 'Rejected', 'Approved']
const loading = ref(false)

const route = useRoute()

onMounted(async () => {
  trackingNumber.value = route.query.id
  if (!trackingNumber.value) {
    alert('Tracking number not provided.')
    return
  }

  loading.value = true
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq('id', trackingNumber.value)
    .single()
  loading.value = false

  if (error) {
    console.error('Error fetching request data:', error)
    alert('Failed to fetch request data. Please try again.')
    return
  }

  requestData.value = data
})

async function updateStatus(status) {
  if (
    !trackingNumber.value ||
    requestData.value.req_status === 'Rejected' ||
    requestData.value.req_status === 'Approved'
  ) {
    return
  }

  const { error } = await supabase
    .from('requests')
    .update({ req_status: status })
    .eq('id', trackingNumber.value)

  if (error) {
    console.error('Error updating request status:', error)
    alert('Failed to update request status. Please try again.')
    return
  }

  requestData.value.req_status = status
  alert(`Request status updated to ${status}.`)
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

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        style="background-color: #ff8c00; color: white"
      >
        <v-container>
          <h2 class="white--text">
            Request Details
          </h2>
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
          <v-row
            justify="center"
            style="margin-bottom: 0"
          >
            <v-col
              cols="12"
              md="8"
            >
              <v-sheet
                class="mx-auto py-3 px-3"
                elevation="3"
              >
                <v-progress-linear
                  v-if="loading"
                  indeterminate
                  color="orange"
                />
                <template v-else>
                  <h3
                    class="text-center"
                    style="margin: 0 0 4px 0"
                  >
                    Request Summary
                  </h3>
                  <v-divider />
                  <v-row>
                    <v-col cols="12">
                      <p><strong>Full Name:</strong> {{ requestData?.name }}</p>
                      <p>
                        <strong>Home Address:</strong>
                        {{ requestData?.address }}
                      </p>
                      <p>
                        <strong>Contact Number:</strong>
                        {{ requestData?.contact_number }}
                      </p>
                      <p><strong>Email Address:</strong> {{ requestData?.email }}</p>
                      <p>
                        <strong>Number of Family Members:</strong>
                        {{ requestData?.family_count }}
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
                        <v-chip
                          :color="getStatusColor(requestData?.req_status)"
                          dark
                        >
                          {{ requestData?.req_status }}
                        </v-chip>
                      </p>
                      <p>
                        <strong>Tracking Number:</strong>
                        {{ requestData?.tracking_number }}
                      </p>
                      <p>
                        <strong>Date of Request:</strong>
                        {{ requestData?.date_of_req }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-divider />
                  <v-row>
                    <v-col cols="12">
                      <h3>Change Status</h3>
                      <v-btn
                        v-for="status in statuses"
                        :key="status"
                        :color="getStatusColor(status)"
                        :disabled="
                          requestData?.req_status === 'Rejected' ||
                            requestData?.req_status === 'Approved'
                        "
                        @click="updateStatus(status)"
                      >
                        {{ status }}
                      </v-btn>
                    </v-col>
                  </v-row>
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

.onprocess .circle {
  background-color: blue;
}

.rejected .circle {
  background-color: red;
}

.approved .circle {
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
