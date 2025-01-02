<script>
import HeaderNav from '@/components/navigation/HeaderNav.vue'
import Button from '@/components/navigation/Button.vue'
import HeroImage from '@/components/navigation/HeroImage.vue'
import FooterNav from '@/components/navigation/FooterNav.vue'

export default {
  name: 'DashboardView',
  components: {
    HeaderNav,
    Button,
    HeroImage,
    FooterNav,
  },
}
</script>

<template>
  <div class="dashboard">
    <HeaderNav />

    <section class="hero">
      <div class="hero-content">
        <h1>Give a Little, Help a Lot</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis vitae nulla quis
          egestas. Mauris eros diam, rutrum posuere velit sit.
        </p>
        <Button text="Read More" />
      </div>
      <HeroImage src="/assets/donations-box.png" alt="Donations box" />
    </section>

    <FooterNav />
  </div>
</template>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px;
  background-color: #f8f9fa;
}

.hero-content {
  max-width: 50%;
}

.hero-content h1 {
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}
</style>
