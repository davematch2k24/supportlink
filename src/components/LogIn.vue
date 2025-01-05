<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabaseClient'

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
  VSpacer, // Import VSpacer
} from 'vuetify/components'

const theme = ref('light')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill out both fields.'
    return
  }

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      throw new Error('Invalid login credentials.')
    }

    console.log('Login successful, redirecting to /requestsdata')
    router.push('/requestsdata') // Redirect to requestsdata on successful login
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message
  }
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar class="px-3" style="background-color: #ff8c00; color: white">
      <v-container>
        <v-row align="center">
          <v-col cols="1" sm="1">
            <img src="/sllogo.png" alt="SupportLink Logo" class="pt-3" style="height: 65px" />
          </v-col>
          <v-spacer />
          <v-col cols="11" sm="3">
            <h2 class="white--text">Worker Login</h2>
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
              <v-form @submit.prevent="handleLogin">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="email" label="Email" type="email" required outlined />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      required
                      outlined
                    />
                  </v-col>
                  <v-col cols="12">
                    <p v-if="errorMessage" style="color: red">
                      {{ errorMessage }}
                    </p>
                  </v-col>
                  <v-col cols="12">
                    <v-btn class="mt-1" type="submit" color="primary" block> Login </v-btn>
                  </v-col>
                </v-row>
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
  background-color: #f0f2f5 !important;
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
