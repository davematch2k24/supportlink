<script setup>
import { formActionDefault, supabase } from '@/utils/supabase'
import { requiredValidator, emailValidator } from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isPasswordVisible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMesage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSucessMesage = 'Login Sucessfully'
    router.replace('/system/dashboard')
  }

  refVForm.value?.reset()

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSucessMesage"
    :form-error-message="formAction.formErrorMesage"
  ></AlertNotification>

  <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
    <v-divider class="my-5"></v-divider>

    <v-text-field
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-btn
      class="gradient-btn mt-2"
      type="submit"
      color="primary"
      block
      prepend-icon="mdi-login-variant"
      >Login</v-btn
    >
  </v-form>
</template>

<style scoped>
.gradient-btn {
  background: linear-gradient(90deg, #ffd700, #ff69b4, #1e88e5); /* Yellow, Pink, Blue */
  color: white; /* Ensures text/icon is visible */
  border: none;
}

.gradient-btn:hover {
  filter: brightness(1.2); /* Brighten on hover */
}

.gradient-btn.v-btn {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Elevation effect */
}
</style>
