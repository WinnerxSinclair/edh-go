<template>
  <div class="gap lool" :class="`${playerStore.layout}-1`">
    <div
      v-for="(player,index) in playerStore.actualPlayers" :key="index"
      class="rel hp flex rc gap-0"
      :class="useCmdDmgBigLayout(index, playerStore.layout, propIndex)"
      
    >
      
      <div @click="partnerFunc(index)" class="names flex-c-c gap">{{player.name}}
        <div v-if="index === propIndex" class="flex-c-c">
          <img v-if="playerStore.actualPlayers[propIndex].dmg[index].length === 1" src="../assets/person.png" alt="">
          <img v-else src="../assets/people.png" alt="">
        </div>
        <!-- <input v-if="index === propIndex" type="checkbox" @change="partnerFunc(index)" :checked="playerStore.actualPlayers[propIndex].dmg[index].length === 2"> -->
      </div>

      
      <div class="grid-50-50 flex-1 rel" v-for="(p, i) in playerStore.actualPlayers[propIndex].dmg[index]" :key="i" :style="{background: player.background}">
        <div class="grid-c" @click="minusCmdDmg(index, i)">
          <img class="life-icon minus-life " src="../assets/minus.svg" alt="">
        </div>
        
        <div class="abs-center pe-none">
          <div class="test-font">{{ p }}</div>
        </div>

        <div 
          v-if="count[index][i]"
          class="abs counter"
        >
          {{`${count[index][i] < 0 ? '-' : '+'} ${Math.abs(count[index][i])}`}}   
        </div>

        <div class="grid-c" @click="addCmdDmg(index, i)">
          <img class="life-icon plus-life " src="../assets/plus.svg" alt="">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import { usePlayerStore } from 'src/stores/player-store';
import { useCmdDmgBigLayout }  from 'src/use/useGetClass'
const playerStore = usePlayerStore();

const props = defineProps({
  propIndex: {
    type: Number,
    required: true
  }
})

const count = ref(Array.from({ length: playerStore.players.length }, () => Array(2).fill(0)));


const timers = Array(playerStore.players.length).fill(null);
function addCmdDmg(i, partner_index){
  playerStore.addCmdDmg(i, props.propIndex, partner_index);
  count.value[i][partner_index]++;
  xd(i);
}
function minusCmdDmg(i, partner_index){
  playerStore.minusCmdDmg(i, props.propIndex, partner_index);
  count.value[i][partner_index]--;
  xd(i);
}
function partnerFunc(index){
  playerStore.partnerFunc(index);
}
function clearCount(i){
  count.value[i][0] = 0;
  count.value[i][1] = 0;
}

function xd(i) {
  if (timers[i]) {
    clearTimeout(timers[i]); // Clear any existing timer for this player
  }
  timers[i] = setTimeout(() => {
    clearCount(i);
    timers[i] = null; // Reset the timer for this player
  }, 2000);
}
</script>

<style lang="scss" scoped>
.counter{
  font-size: .9rem;
  white-space: nowrap;
  z-index: 500;
}
.test-font{
  font-size:calc(1rem + 3vmax);
}
.lool{
  height:100%;
}
.cmd-dmg{
  position:absolute;
  height:25%;
  width:30%;
  left: 10%;
  bottom:2px;
}
.test-grid{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vertical-text {
  writing-mode: vertical-rl;
}

.names{
  font-size: 1rem;
  z-index: 99;
  div{
    img{
      width: 15px;
    }
  }
}

.box{
  position:absolute;
  display:flex;
  font-size:calc(.7rem + 1vmin);
  border-radius: 1rem;
  background:white;
}

.hor-text{
  .names{
    background:white;
    padding: 0 1rem;
    border-radius: 1rem;
    position:absolute;
    top:5px;
    left:50%;
    transform:translate(-50%, 0);
    white-space:nowrap;
  }
  .counter{
    left: 50%;
    top: 22%;
    transform: translate(-50%, 0);
  }
  .box{
    bottom:2px;
    right:10%;
    height:min(25%, 80px);;
    padding: .1rem 1rem;

    .test-grid{
      width: 20px;
    }
    .icon{
      height:50%;
      min-width:15px;
      max-width:100%;
    }
  }
  .plus-life{
    margin-left:50%;
  }
  .minus-life{
    margin-right:50%;
  }
}

//vertical
.vertical-text{
  .names{
    background:white;
    padding: 1rem 0;
    border-radius: 1rem;
    position: absolute;
    right:5px;
    top:50%;
    transform: translate(0, -50%);
    white-space:nowrap;
    div{
      img{
        transform: rotate(90deg);
      }
    }
  }
  .counter{
    top: 50%;
    right: 22%;
    transform: translate(0, -50%);
  }
  .box{
    left:2px;
    bottom:10%;
    width: min(25%, 80px);
    padding: 1rem .1rem;

    .test-grid{
      height: 20px;
    }
    .icon{
      width:50%;
      max-width:25px;
      min-height:15px;
      max-height:100%;
    }
  }
  .life-icon{
    transform: rotate(90deg);
  }
  .plus-life{
    margin-top:50%;
  }
  .minus-life{
    margin-bottom:50%;
  }
}

.gap{
  gap: 2px;
}
//grids
.two-1{
  display:grid;
  grid-template-columns: 1;
  grid-template-rows: 1fr 1fr;
}

.three-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
}

.four-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.four-alt-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}

.five-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5fr 1.5fr 1fr;
}

.five-alt-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.six-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.six-alt-1{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.25fr 1.25fr 1fr;
}
</style>