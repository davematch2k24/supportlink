<script>
import FooterNav from '@/components/navigation/FooterNav.vue'
import TextField from '@/components/navigation/TextField.vue'
import Button from '@/components/navigation/Button.vue'

export default {
  name: 'RegisterView',
  components: {
    FooterNav,
    TextField,
    Button,
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
      alert('Registration successful!')
      // Add logic to handle registration (e.g., API call)
    },
  },
}
</script>

<template>
  <div class="register-view">
    <section class="register-section">
      <div class="register-container">
        <h1 class="title">Create an Account</h1>
        <form @submit.prevent="handleSubmit" class="register-form">
          <TextField
            v-model="formData.name"
            label="Full Name"
            placeholder="Enter your full name"
            id="name"
            type="text"
          />
          <TextField
            v-model="formData.email"
            label="Email Address"
            placeholder="Enter your email"
            id="email"
            type="email"
          />
          <TextField
            v-model="formData.password"
            label="Password"
            placeholder="Create a password"
            id="password"
            type="password"
          />
          <TextField
            v-model="formData.confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            id="confirmPassword"
            type="password"
          />
          <Button :type="'submit'">Register</Button>

          <p class="signup-link">
            Already have an account? <RouterLink to="/">Login here</RouterLink>
          </p>
        </form>
      </div>
    </section>

    <FooterNav />
  </div>
</template>

<style scoped>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.register-section {
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 20px;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
