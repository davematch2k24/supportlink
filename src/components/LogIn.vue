<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabaseClient' // Adjusted import path

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
    const { error } = await supabase.auth.signIn({
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
            Worker Login
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
              md="6"
            >
              <v-sheet
                class="mx-auto py-3 px-3"
                elevation="3"
              >
                <h3
                  class="text-center"
                  style="margin: 0 0 4px 0"
                >
                  Sign In
                </h3>
                <v-form @submit.prevent="handleLogin">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                    style="margin: 0 0 4px 0"
                  />
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    style="margin: 0 0 4px 0"
                  />
                  <p
                    v-if="errorMessage"
                    style="color: red"
                  >
                    {{ errorMessage }}
                  </p>
                  <v-btn
                    class="mt-1"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white; margin: 0"
                  >
                    Login
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
