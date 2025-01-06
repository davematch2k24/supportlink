<template>
  <v-app>
    <v-responsive style="background-color: #a8e4ef">
      <!-- Header and Worker/Client Section -->
      <v-row justify="center" class="pa-6" style="background-color: #a8e4ef">
        <!-- Left: Worker and Client Buttons -->
        <v-col cols="12" md="5" class="text-center">
          <v-img :src="slLogo" max-width="50%" class="mb-4 mx-auto" alt="SupportLink Logo" />

          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn
                block
                color="teal lighten-2"
                class="white--text text-h5"
                @click="navigateTo('worker')"
              >
                <v-icon class="me-3" left> mdi-account-hard-hat </v-icon>
                Worker
              </v-btn>
            </v-col>
            <v-col class="text-h5">
              <h3>or</h3>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                block
                color="orange lighten-2"
                class="white--text text-h5"
                @click="navigateTo('client')"
              >
                <v-icon class="me-3" left> mdi-account-group </v-icon>
                Client
              </v-btn>
              <p class="mt-5">
                Follow up on your service request?
                <v-btn text color="secondary" @click="navigateTo('tracking')"> Track here. </v-btn>
              </p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right: Description and Images -->
        <v-col cols="12" md="7">
          <h2 class="ms-5 me-3 my-8">SupportLink</h2>
          <p>
            SupportLink is designed to support the functionality of a community aid platform aimed
            at helping social workers efficiently manage and respond to help requests from
            individuals within their community.
          </p>

          <!-- Images under the description -->
          <v-row class="mt-4" justify="center">
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                :src="donationImg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Community Support"
              />
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                :src="supportImg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Support Session"
              />
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                :src="foodImg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Volunteer Distribution"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Footer Section -->
      <v-footer style="background-color: #ff8c00" border app>
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
    </v-responsive>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import {
  VApp,
  VResponsive,
  VRow,
  VCol,
  VImg,
  VBtn,
  VIcon,
  VFooter,
  VContainer,
} from 'vuetify/components'

import slLogo from '@/assets/images/sllogo.png'
import donationImg from '@/assets/images/donation.jpg'
import supportImg from '@/assets/images/support.jpg'
import foodImg from '@/assets/images/food.jpg'

export default defineComponent({
  name: 'LandingPage',
  components: {
    VApp,
    VResponsive,
    VRow,
    VCol,
    VImg,
    VBtn,
    VIcon,
    VFooter,
    VContainer,
  },
  setup() {
    const router = useRouter()

    const navigateTo = (role) => {
      if (role === 'client') {
        router.push('/client-info') // Replace with your actual client form route
      } else if (role === 'worker') {
        router.push('/login') // Replace with your actual login form route
      } else if (role === 'tracking') {
        router.push('/tracking') // Replace with your actual tracking page route
      }
    }

    return {
      navigateTo,
    }
  },
  data() {
    return {
      slLogo,
      donationImg,
      supportImg,
      foodImg,
    }
  },
})
</script>

<style scoped>
* {
  font-family: 'Lucida Sans';
}

.text-h5 {
  font-size: 1rem; /* Increased font size for better readability */
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

/* Bounce Animation */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.bounce-animation {
  animation: bounce 2s infinite;
}
</style>
