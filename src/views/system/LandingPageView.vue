<script>
export default {
  name: 'SupportLinkLayout',
  methods: {
    redirectToLoginForm() {
      this.$router.push('/login') // Replace with your actual login form route
    },
    redirectToRequestForm() {
      this.$router.push('/requestform') // Replace with your actual request form route
    },
  },
}
</script>

<template>
  <v-app>
    <v-responsive style="background-color: #a8e4ef">
      <!-- Header and Worker/Client Section -->
      <v-row justify="center" class="pa-6" style="background-color: #a8e4ef">
        <!-- Left: Worker and Client Buttons -->
        <v-col cols="12" md="5" class="text-center">
          <v-img
            src="/public/sllogo.png"
            max-width="50%"
            class="mb-4 mx-auto"
            alt="SupportLink Logo"
          ></v-img>

          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn
                block
                color="teal lighten-2"
                class="white--text text-h5"
                @click="redirectToLoginForm"
              >
                <v-icon class="me-3" left>mdi-account-hard-hat</v-icon>
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
                @click="redirectToRequestForm"
              >
                <v-icon class="me-3" left>mdi-account-group</v-icon>
                Client
              </v-btn>
              <p class="mt-2">Follow up on your service request? Track here.</p>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right: Description and Images -->
        <v-col cols="12" md="7" class="">
          <!-- SupportLink Description -->
          <h3 class="ms-5 me-3 my-8">
            <h2>SupportLink</h2>
            is designed to support the functionality of a community aid platform aimed at helping
            social workers efficiently manage and respond to help requests from individuals within
            their community.
          </h3>

          <!-- Images under the description -->
          <v-row class="mt-4" justify="center">
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                src="/public/donation.jpg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Community Support"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                src="/public/support.jpg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Support Session"
              ></v-img>
            </v-col>
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                src="/public/food.jpg"
                aspect-ratio="16/9"
                class="rounded-lg bounce-animation"
                alt="Volunteer Distribution"
              ></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Footer Section -->
      <v-footer style="background-color: #a8e4ef" border app>
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
    </v-responsive>
  </v-app>
</template>

<style scoped>
* {
  font-family: 'Lucida Sans';
}

.text-h5 {
  font-size: 1.5rem;
}

.shadow-section {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adds a custom shadow */
}

.text-center {
  text-align: center;
}

.mx-8 {
  margin-left: 32px;
  margin-right: 32px;
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
