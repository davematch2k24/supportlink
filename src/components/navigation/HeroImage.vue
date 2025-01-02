<template>
  <div class="hero-image">
    <img :src="imageSrc" :alt="altText" />
  </div>
</template>

<script>
export default {
  name: 'HeroImage',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: 'Hero Image',
    },
  },
}
</script>

<style scoped>
.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
