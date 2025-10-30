<template>
  <section
    class="parallax"
    :style="{ backgroundImage: `url(${bgUrl})` }"
  >
    <div class="parallax-content">
      <slot />
    </div>
  </section>
</template>

<script setup>
// Props: image url for background
defineProps({
  bgUrl: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--light-color);
}
.parallax::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.parallax-content {
  position: relative;
  z-index: 1;
}
</style>