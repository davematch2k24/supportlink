<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const formData = ref({
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  homeAddress: '',
  numberOfFamilyMembers: '',
})

const rules = {
  required: (value) => !!value || 'This field is required.',
  phoneNumber: (value) => /^\d+$/.test(value) || 'Phone number must contain only numbers.',
}

const router = useRouter()

function handleSubmit() {
  if (
    !formData.value.fullName ||
    !formData.value.phoneNumber ||
    !rules.phoneNumber(formData.value.phoneNumber) ||
    !formData.value.homeAddress ||
    !formData.value.numberOfFamilyMembers
  ) {
    alert('Please fill out all required fields correctly.')
    return
  }
  // Save data to localStorage
  localStorage.setItem('firstPageData', JSON.stringify(formData.value))
  // Navigate to the ClientRequest page
  router.push('/clientrequest')
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-container>
          <h1>Client Information Form</h1>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <v-container>
          <h3>Personal Information</h3>
          <v-sheet class="mx-auto" width="100%">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.fullName"
                    :rules="[rules.required]"
                    label="Full Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.homeAddress"
                    :rules="[rules.required]"
                    label="Home Address"
                    type="text"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.numberOfFamilyMembers"
                    :rules="[rules.required]"
                    label="Number of Family Members"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h3>Contact Information:</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.phoneNumber"
                    :rules="[rules.required, rules.phoneNumber]"
                    label="Phone Number"
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.emailAddress"
                    label="Email Address (Optional)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn class="mt-2" type="submit" block>Next</v-btn>
            </v-form>
          </v-sheet>
        </v-container>
      </v-main>
      <v-footer border app>
        <h5>Copyright - SupportLink 2024</h5>
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.register-section {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: left;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}
</style>
