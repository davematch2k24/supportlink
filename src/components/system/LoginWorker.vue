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
    console.error('Login error:', error.message)
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
            <v-text-field label="Email" v-model="email" type="email" required></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              required
            ></v-text-field>
            <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="handleLogin">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.full-height {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
