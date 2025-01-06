<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const formData = ref({
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  homeAddress: '',
  numberOfFamilyMembers: '',
  requestType: '',
  requestPurpose: '',
  status: 'Pending', // Default status
})

const rules = {
  required: (value) => !!value || 'This field is required.',
}

const requestTypeOptions = ['Money Assistance', 'Food', 'Housing', 'Guidance']

const router = useRouter()

onMounted(() => {
  const firstPageData = JSON.parse(localStorage.getItem('firstPageData'))
  if (firstPageData) {
    Object.assign(formData.value, firstPageData)
  }
})

function generateTrackingNumber() {
  return Math.random().toString(36).substring(2, 12).toUpperCase()
}

function handleSubmit() {
  if (!formData.value.requestType || !formData.value.requestPurpose) {
    alert('Please fill out all required fields.')
    return
  }
  const trackingNumber = generateTrackingNumber()
  const submissionData = { ...formData.value, trackingNumber }
  localStorage.setItem('submissionData', JSON.stringify(submissionData))
  router.push(`/viewresult?trackingNumber=${trackingNumber}`)
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
        <v-container>
          <h2 class="white--text">Client Request Form</h2>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        style="
          background-image: url('/public/background-forms.jpg');
          background-size: cover;
          background-position: center;
        "
      >
        <v-container>
          <v-sheet class="mx-auto py-4 px-4" elevation="3" style="max-width: 800px">
            <v-form @submit.prevent="handleSubmit">
              <h3 class="text-center" style="margin-bottom: 20px">Personal Information</h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.requestType"
                    :items="requestTypeOptions"
                    :rules="[rules.required]"
                    label="Request Type"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.requestPurpose"
                    :rules="[rules.required]"
                    label="Request Purpose"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn
                class="mt-2"
                type="submit"
                block
                style="background-color: #ff8c00; color: white"
                >Submit</v-btn
              >
            </v-form>
          </v-sheet>
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
  margin: 0;
  padding: 0;
}

.main-content {
  padding-bottom: 0;
  margin: 0;
}

.footer {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  height: 16px;
}

.footer-text {
  margin: 0;
  font-size: 12px;
  line-height: 16px;
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
