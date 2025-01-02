<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const theme = ref('light')
const trackingNumber = ref('')
const resultData = ref({})

const route = useRoute()

onMounted(() => {
  trackingNumber.value = route.query.trackingNumber
  const storedData = JSON.parse(localStorage.getItem('submissionData'))
  if (storedData && storedData.trackingNumber === trackingNumber.value) {
    resultData.value = storedData
  } else {
    alert('No data found for this tracking number.')
  }
})
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-container>
          <h1>Request Details</h1>
        </v-container>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-sheet class="mx-auto" width="100%">
            <h3 class="tracking-number">Tracking Number: {{ trackingNumber }}</h3>
            <v-divider></v-divider>
            <div class="info-section">
              <p><strong>Full Name:</strong> {{ resultData.fullName }}</p>
              <p><strong>Phone Number:</strong> {{ resultData.phoneNumber }}</p>
              <p><strong>Email Address:</strong> {{ resultData.emailAddress }}</p>
              <p><strong>Home Address:</strong> {{ resultData.homeAddress }}</p>
              <p>
                <strong>Number of Family Members:</strong> {{ resultData.numberOfFamilyMembers }}
              </p>
            </div>
            <v-divider></v-divider>
            <div class="info-section">
              <p><strong>Request Type:</strong> {{ resultData.requestType }}</p>
              <p><strong>Request Purpose:</strong> {{ resultData.requestPurpose }}</p>
            </div>
            <v-divider></v-divider>
            <div class="info-section">
              <p class="request-status">
                <strong>Request Status:</strong>
                <span :class="(resultData.status || 'pending').toLowerCase()"
                  ><span class="circle"></span> {{ resultData.status || 'Pending' }}</span
                >
              </p>
            </div>
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
  padding: 50px; /* Increased padding */
  max-width: 800px; /* Increased max-width */
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 36px; /* Increased font size */
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 25px; /* Increased gap */
}

.signup-link {
  margin-top: 20px;
  font-size: 1.2rem; /* Increased font size */
  text-align: left;
}

.signup-link a {
  color: #4caf50;
  text-decoration: none;
}

.tracking-number {
  font-size: 28px; /* Increased font size */
  margin-bottom: 20px;
}

.info-section {
  margin: 30px 0; /* Added more margin */
  font-size: 20px; /* Increased font size */
}

.request-status {
  font-size: 22px; /* Increased font size */
  font-weight: bold;
  display: flex;
  align-items: center;
}

.circle {
  display: inline-block;
  width: 20px; /* Increased size */
  height: 20px; /* Increased size */
  border-radius: 50%;
  margin-left: 10px; /* Added space before the circle */
}

/* Status circles */
.pending .circle {
  background-color: orange;
}

.ongoing .circle {
  background-color: blue;
}

.rejected .circle {
  background-color: red;
}

.accepted .circle {
  background-color: green;
}
</style>
