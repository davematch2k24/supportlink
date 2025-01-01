<script>
import HeaderNav from '@/components/navigation/HeaderNav.vue'
import FooterNav from '@/components/navigation/FooterNav.vue'
import TextField from '@/components/navigation/TextField.vue'
import Button from '@/components/navigation/Button.vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'LoginView',
  components: {
    HeaderNav,
    FooterNav,
    TextField,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log('Logging in with:', this.email, this.password)
    },
  },
}
</script>

<template>
  <div class="login-view">
    <section class="login-section">
      <div class="login-form-container">
        <h1 class="login-title">Welcome Back!</h1>
        <p class="login-subtitle">Please sign in to continue</p>
        <form @submit.prevent="handleLogin" class="login-form">
          <TextField label="Email" type="email" v-model="email" required />
          <TextField label="Password" type="password" v-model="password" required />
          <Button text="Login" />
        </form>
        <p class="signup-link">
          Don't have an account? <RouterLink to="/register">Sign up</RouterLink>
        </p>
      </div>
    </section>

    <FooterNav />
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  color: #333;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.login-form-container {
  max-width: 400px;
  width: 100%;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-title {
  font-size: 2rem;
  color: #4caf50;
  margin-bottom: 10px;
}

.login-subtitle {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}
</style>
