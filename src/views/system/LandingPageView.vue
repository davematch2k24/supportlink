<script>
export default {
  name: 'SupportLinkLayout',
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <!-- Header and Worker/Client Section -->
      <v-row justify="center" class="pa-6" style="background-color: #a8e4ef">
        <v-col cols="12" md="6" class="text-center">
          <v-img src="/sllogo.jpg" max-width="120" class="mb-4" alt="SupportLink Logo"></v-img>

          <v-row>
            <v-col cols="12" md="6" class="text-center">
              <v-btn block color="teal lighten-2" class="white--text text-h5">
                <v-icon left>mdi-account-hard-hat</v-icon>
                Worker
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="text-center">
              <v-btn block color="orange lighten-2" class="white--text text-h5">
                <v-icon left>mdi-account-group</v-icon>
                Client
              </v-btn>
              <p>Follow up on your service request? Track here.</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <p>
            SupportLink is a Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </v-col>
      </v-row>

      <!-- Image and Contact Section -->
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            src="image1_url_here"
            aspect-ratio="16/9"
            class="rounded-lg"
            alt="Community Support"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-img
            src="image2_url_here"
            aspect-ratio="16/9"
            class="rounded-lg"
            alt="Volunteer Distribution"
          ></v-img>
        </v-col>
        <v-col cols="12" md="4">
          <v-img
            src="image3_url_here"
            aspect-ratio="16/9"
            class="rounded-lg"
            alt="Support Session"
          ></v-img>
        </v-col>
      </v-row>

      <!-- Footer Section -->
      <v-row justify="center" class="pa-6" style="background-color: #f4f4f4">
        <v-col cols="12" md="8" class="text-center">
          <p>Contacts: supportlink@gmail.com | Social Media: Facebook, Twitter, Instagram</p>
        </v-col>
        <v-col cols="12" md="8" class="text-center">
          <p>Languages Supported: Filipino, Cebuano, English</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.text-h5 {
  font-size: 1.5rem;
}
</style>
