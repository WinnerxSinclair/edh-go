<template>
  <div class="outer" @click="$emit('closeModal')">
    <div class="inner" @click.stop>
      <slot />
    </div>
  </div>
</template>

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
  display:flex;
  justify-content: center;
  align-items: center;
}
</style>