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
  VSpacer,
} from 'vuetify/components'

// Import images
import workerImage from '@/assets/images/worker.jpg'
import backgroundFormsImage from '@/assets/images/background-forms.jpg'
import slLogo from '@/assets/images/sllogo.png'

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
    <!-- Header Section -->
    <v-app-bar
      class="px-3"
      :style="{ backgroundImage: `url(${workerImage})`, backgroundSize: 'cover' }"
      color="transparent"
    >
      <v-container>
        <v-row align="center">
          <v-col cols="1" sm="1">
            <img :src="slLogo" alt="SupportLink Logo" class="pt-3" style="height: 65px" />
          </v-col>
          <v-col cols="3" sm="3">
            <v-btn color="yellow" outlined class="ml-3" @click="router.push('/')">
              Landing Page
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="7" sm="3">
            <h2 class="white--text">Worker Login</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <!-- Main Section -->
    <v-main
      :style="{
        backgroundImage: `url(${backgroundFormsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
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
                    <v-btn class="mt-1" type="submit" color="yellow" block> Login </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer Section -->
    <v-footer :style="{ backgroundImage: `url(${workerImage})`, backgroundSize: 'cover' }" app>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="12" sm="6" class="text-center text-sm-start">
            <span class="white--text">© 2024 - SupportLink | All Rights Reserved</span>
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-sm-end">
            <a href="/privacy-policy" class="footer-link white--text">Privacy Policy</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/terms-of-service" class="footer-link white--text">Terms of Service</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/faqs" class="footer-link white--text">FAQs</a>
            <span class="footer-divider mx-2">|</span>
            <a href="/feedback" class="footer-link white--text">Feedback</a>
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
  background-size: cover !important;
  color: white !important;
}

.v-main {
  background-color: #f0f2f5 !important;
  background-size: cover !important;
  background-position: center !important;
}

.v-footer {
  background-size: cover !important;
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
