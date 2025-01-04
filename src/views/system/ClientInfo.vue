<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../utils/supabaseClient' // Adjusted import path
import { v4 as uuidv4 } from 'uuid' // Import uuid library

const theme = ref('light')
const formData = ref({
  name: '',
  contact_number: '',
  email: '',
  address: '',
  family_count: '',
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
    !formData.value.name ||
    !formData.value.contact_number ||
    !rules.phoneNumber(formData.value.contact_number) ||
    !formData.value.address ||
    !formData.value.family_count
  ) {
    alert('Please fill out all required fields correctly.')
    return
  }

  const trackingNumber = uuidv4() // Generate a valid UUID for the tracking number

  console.log('Form Data:', JSON.parse(JSON.stringify(formData.value))) // Extract raw data

  try {
    // Insert client information into the `clients` table
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          tracking_number: trackingNumber, // Use the generated UUID tracking number
          name: formData.value.name,
          contact_number: formData.value.contact_number,
          address: formData.value.address,
          email: formData.value.email,
          family_count: formData.value.family_count,
        },
      ])
      .select()

    console.log('Supabase Response (Insert Client):', { data, error })

    if (error) {
      console.error('Error uploading data (Insert Client):', JSON.stringify(error, null, 2))
      alert('Failed to upload data. Please try again.')
      return
    }

    // Save tracking number and client data to localStorage
    localStorage.setItem('trackingNumber', trackingNumber)
    localStorage.setItem('firstPageData', JSON.stringify(formData.value))

    alert('Form submitted successfully!')
    // Navigate to the ClientRequest page
    router.push('/clientrequest')
  } catch (err) {
    console.error('Error in handleSubmit function:', err.message)
    alert('Failed to upload data. Please try again.')
  }
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
                        v-model="formData.name"
                        :rules="[rules.required]"
                        label="Full Name"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.address"
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
                        v-model="formData.family_count"
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
                        v-model="formData.contact_number"
                        :rules="[rules.required, rules.phoneNumber]"
                        label="Phone Number"
                        type="text"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData.email"
                        :rules="[rules.email]"
                        label="Email Address (Optional)"
                        style="margin: 0 0 4px 0"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center">
                      <v-btn
                        class="mt-1"
                        type="submit"
                        style="background-color: #ff8c00; color: white; margin: 0"
                        >Next</v-btn
                      >
                    </v-col>
                  </v-row>
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

.v-form {
  padding-bottom: 50px; /* Add padding to prevent the button from overlapping with the footer */
}
</style>
