<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const trackingNumber = ref('')

const rules = {
  required: (value) => !!value || 'This field is required.',
}

const router = useRouter()

function isValidTrackingNumber(number) {
  // Add your validation logic here, for example:
  const regex = /^[A-Z0-9]{10,20}$/
  return regex.test(number)
}

function trackPackage() {
  if (!trackingNumber.value) {
    alert('Please enter a tracking number.')
    return
  }

  if (!isValidTrackingNumber(trackingNumber.value)) {
    alert('Invalid tracking number. Please enter a valid tracking number.')
    return
  }

  // Navigate to the ResultView component
  router.push(`/viewresult?trackingNumber=${trackingNumber.value}`)
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
        <v-container>
          <h2 class="white--text">Track Your Request</h2>
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
              <v-sheet class="mx-auto mt-5 mb-2 py-4 px-4" elevation="3">
                <h3 class="text-center">Enter Your Tracking Number</h3>
                <v-form @submit.prevent="trackPackage">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="trackingNumber"
                        label="Tracking Number"
                        placeholder="Enter Tracking Number"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="mt-2"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white"
                    >Track</v-btn
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
<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
        <v-container>
          <h2 class="white--text">Track Your Package</h2>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        class="pt-10"
        style="
          background-image: url('/public/background-forms.jpg');
          background-size: cover;
          background-position: center;
        "
      >
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-sheet class="mx-auto mt-5 mb-2 py-4 px-4" elevation="3">
                <h3 class="text-center">Enter Your Tracking Number</h3>
                <v-form @submit.prevent="trackPackage">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="trackingNumber"
                        label="Tracking Number"
                        placeholder="Enter Tracking Number"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="mt-2"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white"
                    >Track</v-btn
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const trackingNumber = ref('')

const rules = {
  required: (value) => !!value || 'This field is required.',
}

const router = useRouter()

function trackPackage() {
  if (!trackingNumber.value) {
    alert('Please enter a tracking number.')
    return
  }
  router.push({ name: 'viewresult', query: { trackingNumber: trackingNumber.value } })
}
</script>

<style scoped>
.v-app-bar {
  background-color: #ff8c00 !important;
  color: white !important;
}

.v-main {
  background-image: url('/public/background-forms.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  padding-top: 10rem !important; /* Added extra padding */
}

.v-footer {
  background-color: #ff8c00 !important;
  color: white !important;
  height: 12px !important;
}

.v-footer p {
  margin: 0 !important;
  font-size: 14px !important;
  line-height: 12px !important;
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
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: left;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.main-content {
  padding-bottom: 0;
  margin: 0;
}

.footer {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  height: 12px;
}

.footer-text {
  margin: 0;
  font-size: 14px;
  line-height: 12px;
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
