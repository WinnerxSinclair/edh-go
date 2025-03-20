<template>
  <div class="outer" @click="$emit('closeModal')">
    <div :class="[inner ? 'inner-alt' : 'inner']" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  inner: {
    type: Boolean,
    required: false
  }
})
</script>
<style lang="scss" scoped>
.outer{
  inset: 0;
  background:rgba(0, 0, 0, 0.705);
  position: absolute;
  backdrop-filter: blur(3px);
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}

.inner{
  width: 90%;
  height: 85%;
}
.inner-alt{
  width: 90%;
  max-height: 85%;
  overflow: scroll;
  border-radius: 1rem;
  
}
</style>