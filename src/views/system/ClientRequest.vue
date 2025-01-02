<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const theme = ref('light')
const formData = ref({
  fullName: '',
  phoneNumber: '',
  emailAddress: '',
  homeAddress: '',
  numberOfFamilyMembers: '',
  requestType: '',
  requestPurpose: '',
  status: 'Pending', // Default status
})

const rules = {
  required: (value) => !!value || 'This field is required.',
}

const requestTypeOptions = ['Money Assistance', 'Food', 'Housing', 'Guidance']

const router = useRouter()

onMounted(() => {
  const firstPageData = JSON.parse(localStorage.getItem('firstPageData'))
  if (firstPageData) {
    Object.assign(formData.value, firstPageData)
  }
})

function generateTrackingNumber() {
  return Math.random().toString(36).substring(2, 12).toUpperCase()
}

function handleSubmit() {
  if (!formData.value.requestType || !formData.value.requestPurpose) {
    alert('Please fill out all required fields.')
    return
  }
  const trackingNumber = generateTrackingNumber()
  const submissionData = { ...formData.value, trackingNumber }
  localStorage.setItem('submissionData', JSON.stringify(submissionData))
  router.push(`/viewresult?trackingNumber=${trackingNumber}`)
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-container>
          <h1>Client Request Form</h1>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-sheet class="mx-auto" width="100%">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="formData.requestType"
                    :items="requestTypeOptions"
                    :rules="[rules.required]"
                    label="Request Type"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="formData.requestPurpose"
                    :rules="[rules.required]"
                    label="Request Purpose"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
