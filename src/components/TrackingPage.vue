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
  router.push({
    path: '/viewresult',
    query: { trackingNumber: trackingNumber.value },
  })
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        style="background-color: #ff8c00; color: white; margin-bottom: 0"
      >
        <v-container>
          <h2
            class="white--text"
            style="margin: 0"
          >
            Track Your Request
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
                <h3
                  class="text-center"
                  style="margin: 0 0 4px 0"
                >
                  Enter Tracking Number
                </h3>
                <v-form @submit.prevent="trackPackage">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="trackingNumber"
                        :rules="[rules.required]"
                        label="Tracking Number"
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
                    Track
                  </v-btn>
                </v-form>
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
.v-app-bar {
  background-color: #ff8c00 !important;
  color: white !important;
}

.v-main {
  background-image: url('/src/assets/images/background-forms.jpg') !important;
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
