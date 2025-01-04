<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../utils/supabase' // Adjusted import path

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
  email: (value) => /.+@.+\..+/.test(value) || 'Invalid email address.',
  number: (value) => !isNaN(value) || 'Must be a number.',
}

const router = useRouter()

async function handleSubmit() {
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

  // Insert data into Supabase
  const { error } = await supabase.from('clients').insert([
    {
      name: formData.value.fullName,
      contact_number: formData.value.phoneNumber,
      address: formData.value.homeAddress,
      email: formData.value.emailAddress,
      family_count: formData.value.numberOfFamilyMembers,
    },
  ])

  if (error) {
    console.error('Error uploading data:', error)
    alert('Failed to upload data. Please try again.')
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
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white; margin-bottom: 0">
        <v-container>
          <h2 class="white--text" style="margin: 0">Client Information Form</h2>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        style="
          background-image: url('/public/background-forms.jpg');
          background-size: cover;
          background-position: center;
          padding-bottom: 0;
          margin-bottom: 0;
        "
      >
        <v-container style="padding-bottom: 0; margin-bottom: 0">
          <v-row justify="center" style="margin-bottom: 0">
            <v-col cols="12" md="8">
              <v-sheet class="mx-auto py-3 px-3" elevation="3">
                <h3 class="text-center" style="margin: 0 0 4px 0">Personal Information</h3>
                <v-form @submit.prevent="handleSubmit">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.fullName"
                        :rules="[rules.required]"
                        label="Full Name"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.homeAddress"
                        :rules="[rules.required]"
                        label="Home Address"
                        type="text"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.numberOfFamilyMembers"
                        :rules="[rules.required, rules.number]"
                        label="Number of Family Members"
                        type="number"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <h3 style="margin: 0 0 4px 0">Contact Information</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.phoneNumber"
                        :rules="[rules.required, rules.phoneNumber]"
                        label="Phone Number"
                        type="text"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.emailAddress"
                        :rules="[rules.email]"
                        label="Email Address (Optional)"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="mt-1"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white; margin: 0"
                    >Next</v-btn
                  >
                </v-form>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Footer Section -->
      <v-footer style="background-color: #ff8c00" border app>
        <v-container>
          <v-row justify="space-between">
            <!-- Left-aligned text -->
            <v-col cols="12" sm="6" class="text-center text-sm-start">
              <span>Copyright © 2024 - SupportLink | All Rights Reserved</span>
            </v-col>

            <!-- Right-aligned links in a single line -->
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
  </v-responsive>
</template>

<style scoped>
body {
  overflow: hidden;
}
.register-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.register-section {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  padding: 0;
  margin: 0;
}

.register-container {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: left;
  margin: 0;
  padding: 0;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.main-content {
  padding-bottom: 0;
  margin: 0;
}

.footer {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  height: 12px;
}

.footer-text {
  margin: 0;
  font-size: 14px;
  line-height: 12px;
}

@media (max-width: 600px) {
  .px-3 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .mt-2 {
    margin-top: 0.5rem !important;
  }
  .border.rounded {
    border-radius: 5px !important;
  }
}
</style>
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
      <v-app-bar class="px-3" style="background-color: #ff8c00; color: white; margin-bottom: 0">
        <v-container>
          <h2 class="white--text" style="margin: 0">Client Information Form</h2>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main
        style="
          background-image: url('/public/background-forms.jpg');
          background-size: cover;
          background-position: center;
          padding-bottom: 0;
          margin-bottom: 0;
        "
      >
        <v-container style="padding-bottom: 0; margin-bottom: 0">
          <v-row justify="center" style="margin-bottom: 0">
            <v-col cols="12" md="8">
              <v-sheet class="mx-auto py-3 px-3" elevation="3">
                <h3 class="text-center" style="margin: 0 0 4px 0">Personal Information</h3>
                <v-form @submit.prevent="handleSubmit">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.fullName"
                        :rules="[rules.required]"
                        label="Full Name"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.homeAddress"
                        :rules="[rules.required]"
                        label="Home Address"
                        type="text"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.numberOfFamilyMembers"
                        :rules="[rules.required]"
                        label="Number of Family Members"
                        type="number"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <h3 style="margin: 0 0 4px 0">Contact Information</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.phoneNumber"
                        :rules="[rules.required, rules.phoneNumber]"
                        label="Phone Number"
                        type="text"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.emailAddress"
                        label="Email Address (Optional)"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn
                    class="mt-1"
                    type="submit"
                    block
                    style="background-color: #ff8c00; color: white; margin: 0"
                    >Next</v-btn
                  >
                </v-form>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- Footer Section -->
      <v-footer style="background-color: #ff8c00" border app>
        <v-container>
          <v-row justify="space-between">
            <!-- Left-aligned text -->
            <v-col cols="12" sm="6" class="text-center text-sm-start">
              <span>Copyright © 2024 - SupportLink | All Rights Reserved</span>
            </v-col>

            <!-- Right-aligned links in a single line -->
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
  </v-responsive>
</template>

<style scoped>
body {
  overflow: hidden;
}
.register-view {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.register-section {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
  padding: 0;
  margin: 0;
}

.register-container {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.signup-link {
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: left;
  margin: 0;
  padding: 0;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.main-content {
  padding-bottom: 0;
  margin: 0;
}

.footer {
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
  height: 12px;
}

.footer-text {
  margin: 0;
  font-size: 14px;
  line-height: 12px;
}

@media (max-width: 600px) {
  .px-3 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .mt-2 {
    margin-top: 0.5rem !important;
  }
  .border.rounded {
    border-radius: 5px !important;
  }
}
</style>
