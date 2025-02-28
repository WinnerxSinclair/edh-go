<template>
  <div class="gap-custom main-grid" :class="[`${playerStore.layout}-1`, useRotateCommanderDmg(propIndex, playerStore.layout)]">
    <div
      v-for="(player,i) in playerStore.actualPlayers[propIndex].dmg" :key="i"
      class="rel hp flex-c-c rc-0"
      :class="[useCommanderDmgLayout(i, playerStore.layout), useRotateCommanderDmg(propIndex, playerStore.layout)]"
      :style="{background: playerStore.players[i].background}"
    >
  
      <div 
        class="fs-sm flex-1 flex-c-c" 
        v-for="(p, igloo) in playerStore.actualPlayers[propIndex].dmg[i]" :key="igloo"
      >
        {{ p }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from 'src/stores/player-store';
import { useCommanderDmgLayout, useRotateCommanderDmg }  from 'src/use/useGetClass'
const playerStore = usePlayerStore();
const props = defineProps({
  propIndex: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.fs-sm{
  font-size:.8rem;
  font-weight:bold;
}

.vertical-text {
  writing-mode: vertical-rl;
}
.main-grid{
  padding: .2rem;
  border-radius: .3rem;
  background:white;
}

.gap-custom{
  gap: 2px;
}
//grids

.two-1{
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

.three-1{
  display:grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.four-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.four-alt-1{
  display:grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.five-1{
  display:grid;
  grid-template-columns: 1.3fr 1.3fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.five-alt-1{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.six-1{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.six-alt-1{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.ga-four-alt-1{
  grid-area: 1 / 1 / 3 / 1;
}
.ga-four-alt-2{
  grid-area: 2 / 2 / 2 / 3;
}
.ga-four-alt-3{
  grid-area: 1 / 2 / 1 / 3;
}
.ga-four-alt-4{
  grid-area: 1 / 3 / 3 / 3;
}

.ga-three-1{
  grid-area: 2 / 1 / 2 / 1;
}
.ga-three-2{
  grid-area: 1 / 1 / 1 / 1;
}
.ga-three-3{
  grid-area: 1 / 2 / 3 / 2;
}


.ga-four-1{
  grid-area: 2 / 1 / 2 / 1;
}
.ga-four-2{
  grid-area: 1 / 1 / 1 / 1;
}
.ga-four-3{
  grid-area: 2 / 2 / 2 / 2;
}
.ga-four-4{
  grid-area: 1 / 2 / 1 / 2;
}


.ga-five-1{
  grid-area: 2 / 1 / 2 / 1;
}
.ga-five-2{
  grid-area: 1 / 1 / 1 / 1;
}
.ga-five-3{
  grid-area: 2 / 2 / 2 / 2;
}
.ga-five-4{
  grid-area: 1 / 2 / 1 / 2;
}
.ga-five-5{
  grid-area: 1 / 3 / 3 / 3;
}



.ga-five-alt-1{
  grid-area: 2 / 1 / 2 / 4;
}
.ga-five-alt-2{
  grid-area: 1 / 1 / 1 / 3;
}
.ga-five-alt-3{
  grid-area: 1 / 3 / 1 / 5;
}
.ga-five-alt-4{
  grid-area: 2 / 4 / 2 / 7;
}
.ga-five-alt-5{
  grid-area: 1 / 5 / 1 / 7;
}


.ga-six-1{
  grid-area: 2 / 1 / 2 / 1;
}
.ga-six-2{
  grid-area: 1 / 1 / 1 / 1;
}
.ga-six-3{
  grid-area: 2 / 2 / 2 / 2;
}
.ga-six-4{
  grid-area: 1 / 2 / 1 / 2;
}
.ga-six-5{
  grid-area: 2 / 3 / 2 / 3;
}
.ga-six-6{
  grid-area: 1 / 3 / 1 / 3;
}


.ga-six-alt-1{
  grid-area: 1 / 1 / 3 / 1;
}
.ga-six-alt-2{
  grid-area: 2 / 2 / 2 / 2;
}
.ga-six-alt-3{
  grid-area: 1 / 2 / 1 / 2;
}
.ga-six-alt-4{
  grid-area: 2 / 3 / 2 / 3;
}
.ga-six-alt-5{
  grid-area: 1 / 3 / 1 / 3;
}
.ga-six-alt-6{
  grid-area: 1 / 4 / 3 / 4;
}


.ga-two-1{
  grid-area: 1 / 1 / 1 / 1;
}
.ga-two-2{
  grid-area: 2 / 1 / 2 / 1;
}
</style>