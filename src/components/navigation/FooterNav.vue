<template>
  <!-- Footer Section -->
  <v-footer style="background-color: #ff6600" border app>
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
</template>

<script>
export default {
  name: 'FooterNav',
}
</script>

<style scoped>
.footer-nav {
  background-color: #f8f9fa;
  text-align: center;
  padding: 20px;
  font-size: 0.9rem;
  color: #666;
}
.social-links a {
  margin: 0 10px;
  color: #666;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>
