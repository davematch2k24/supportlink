<template>
  <footer class="footer-nav">
    <p>&copy; 2025 SupportLink. All rights reserved.</p>
    <div class="social-links">
      <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
    </div>
  </footer>
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
