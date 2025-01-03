<template>
  <v-app>
    <HeaderNav />

    <v-container style="background-color: #d9eafd" class="hero" fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-container class="hero-content mt-10">
            <h1 class="green-text mt-10" :style="{ fontSize: '60px' }">
              Give a Little,
              <br />
              Help a Lot
            </h1>

            <h2 class="mt-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis vitae nulla
              quis egestas. Mauris eros diam, rutrum posuere velit sit.
            </h2>
            <br />
            <v-btn color="" class="mt-3">Read More</v-btn>
          </v-container>
        </v-col>
        <v-col cols="12" md="6" class="my-16">
          <v-responsive class="float-animation elevation-5 rounded" :width="500">
            <v-img
              :width="500"
              aspect-ratio="16/9"
              cover
              src="/public/donation.jpg"
              class=""
            ></v-img>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>

    <FooterNav />
  </v-app>
</template>

<script>
import HeaderNav from '@/components/navigation/HeaderNav.vue'
import Button from '@/components/navigation/Button.vue'
import FooterNav from '@/components/navigation/FooterNav.vue'

export default {
  name: 'DashboardView',
  components: {
    HeaderNav,
    Button,
    FooterNav,
  },
}
</script>

<style scoped>
.hero {
  padding: 50px;
  background-color: #f8f9fa;
}

.hero-content {
  max-width: 80%;
}

.green-text {
  color: #4caf50;
}

.grey-text {
  color: #666;
}

.mt-4 {
  margin-top: 16px;
}

/* Rounded borders */
.rounded {
  border-radius: 40px; /* Adjust the border-radius as needed */
}

/* Add the animation for the image */
.float-animation {
  animation: float 3s ease-in-out infinite; /* Infinite up-and-down animation */
}

@keyframes float {
  0% {
    transform: translateY(0); /* Start at the original position */
  }
  50% {
    transform: translateY(-20px); /* Move up 20px */
  }
  100% {
    transform: translateY(0); /* Return to the original position */
  }
}
</style>
