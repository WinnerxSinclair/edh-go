<template>
  <TheGame />
</template>

<script setup>
import TheGame from 'src/components/TheGame.vue';
import { usePlayerStore } from 'src/stores/player-store';

const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>

</style>