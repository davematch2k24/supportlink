<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Import Vuetify components
import {
  VApp,
  VAppBar,
  VContainer,
  VRow,
  VCol,
  VFooter,
  VSheet,
  VTextField,
  VBtn,
  VForm,
  VMain,
} from 'vuetify/components'

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
  router.push({
    path: '/viewresult',
    query: { trackingNumber: trackingNumber.value },
  })
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h2 class="white--text">Track Your Request</h2>
          </v-col>
        </v-row>
      </v-container>
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
              <h3 class="text-center" style="margin: 0 0 4px 0">Enter Tracking Number</h3>
              <v-form @submit.prevent="trackPackage">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="trackingNumber"
                      :rules="[rules.required]"
                      label="Tracking Number"
                      required
                      outlined
                    />
                  </v-col>
                </v-row>
                <v-btn class="mt-1" type="submit" color="primary" block> Track </v-btn>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

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
