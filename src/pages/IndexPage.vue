<template>
  <TheGame />
</template>

<script setup>
import TheGame from 'src/components/TheGame.vue';
import { onMounted } from 'vue'
import { KeepAwake } from '@capacitor-community/keep-awake';

onMounted(async () => {
  try{
    await KeepAwake.keepAwake();
    console.log('awake');
  }catch(err){
    console.error(err)
  }

})

</script>

<style lang="scss" scoped>

</style>