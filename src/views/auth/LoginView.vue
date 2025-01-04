<script setup>
import { ref } from 'vue'
import { login } from '../utils/authService'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
    router.push('/requestsdata') // Redirect to requestsdata on successful login
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
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
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
