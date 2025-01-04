<script setup>
import { ref } from 'vue'
import { login } from '@/utils/authService' // Ensure this path is correct
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    console.log('Login successful')
    router.push('/requestsdata') // Redirect to requestsdata on successful login
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center" align="center" class="full-height">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title class="headline">Worker Login</v-card-title>
          <v-card-text>
            <v-text-field label="Email" v-model="email" type="email"></v-text-field>
            <v-text-field label="Password" v-model="password" type="password"></v-text-field>
            <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-footer
    style="background-color: #ff8c00; color: white; position: fixed; width: 100%; bottom: 0"
  >
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
</template>

<style scoped>
.full-height {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
