<template>
  <div class="lay gap rel" :class="playerStore.layout">
    <div 
      class="settings flex-c-c" 
      :style="useSettingsIcon(playerStore.layout)" 
      @click="settings_open = true"
    >
      <img src="../assets/d20.png" alt="">
    </div>
    <div
      v-for="(player,index) in playerStore.actualPlayers" :key="index"
      class="grid-50-50 rel secondary "
      :class="[useGetClass(index, playerStore.layout), {'chosen': index === chosenPlayer}]"
      :style="[
               {background: player.background},
               {color: player.text_color},
              ]"
    >
      
      <div 
        class="fs-200 names" 
        @click="profile_open = index"
        v-if="settingsStore.showNames" 
      >
        {{player.name}}  
      </div>
      <div v-else-if="settingsStore.showSettings" class="settings-icon" @click="profile_open = index">
        <img  src="../assets/settings.png" alt="">
      </div>
      
      <div class="grid-c" @touchstart="resetDelay(index, minusLife)" @touchend="stopIncrement(index)">
        <img class="life-icon minus-life" src="../assets/minus.svg" alt="">
      </div>
      
      
      <div class="abs-center pe-none" :style="hpSize(player.life)">{{ player.life }}</div>
      
      <div class="grid-c" @touchstart="resetDelay(index, addLife)" @touchend="stopIncrement(index)" >
        <img class="life-icon plus-life " src="../assets/plus.svg" alt="">
      </div>
      

      <div 
        v-if="count[index]"
        class="abs counter"
      >
        {{`${count[index] < 0 ? '-' : '+'} ${Math.abs(count[index])}`}}     
      </div>


      <!-- <button class="options-btn" @click="counters_open = index" v-if="Object.keys(playerStore.players[index].counters).length === 0"></button> -->

      <div class="bot-container pe-none" >
        <div></div>
        <CommanderDamage v-if="settingsStore.showGrid" 
          class="cmd-dmg" :propIndex="index" @click="cmd_dmg_open = index" 
        />
        <div v-else></div>
        <div class="box" @click="counters_open = index" v-if="Object.keys(playerStore.players[index].counters).length !== 0">
          <template v-for="(val, key) in playerStore.players[index].counters">
            <div class="test-grid" v-if="val > 0">
              <img class="icon" :src="counters[key]" alt="">
              <div class="counters bold">{{ val }}</div>
            </div>
          </template>
        </div>
      </div>

      <div class="status" >
        <img v-if="playerStore.monarch_id" :src="Monarch" :class="{'gray': player.id !== playerStore.monarch_id}" 
          @click="playerStore.monarch_id = playerStore.monarch_id === player.id ? 0 : player.id"
        >
        <img v-if="playerStore.init_id" :src="Initiative" :class="{'gray': player.id !== playerStore.init_id}" 
          @click="playerStore.init_id = playerStore.init_id === player.id ? 0 : player.id"
        >
      </div>
    </div>
    <TheModal v-if="cmd_dmg_open !== null" @closeModal="cmd_dmg_open = null">
      <RealCmdDmg :propIndex="cmd_dmg_open" />
    </TheModal>

    
    <TheCounters v-if="counters_open !== null" :propIndex="counters_open" @closeCounters="counters_open = null" />
    

    <TheProfile v-if="profile_open !== null" :propIndex="profile_open" @save="profile_open = null" />
    
    <TheModal v-if="settings_open" @closeModal="settings_open = false">
      <TheSettings @choose="chooseRandomPlayer" />
    </TheModal>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import { usePlayerStore } from 'src/stores/player-store';
import { useSettingsStore } from 'src/stores/settings-store'
import { useGetClass }  from 'src/use/useGetClass'
import { useSettingsIcon } from 'src/use/useGetStyle'
import CommanderDamage from './CommanderDamage.vue';
import TheModal from './TheModal.vue';
import RealCmdDmg from './RealCmdDmg.vue';
import TheCounters from './TheCounters.vue';
import TheProfile from './TheProfile.vue';
import TheSettings from './TheSettings.vue';
import poisonIcon from '../assets/poison.svg'
import taxIcon from '../assets/coin.png'
import treasureIcon from '../assets/treasure.png'
import radIcon from '../assets/rad.png'
import expIcon from '../assets/exp.png'
import energyIcon from '../assets/energy.png'
import speedIcon from '../assets/speed.png'
import Monarch from '../assets/crown.png'
import Initiative from '../assets/initiative.png'
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();
const counters = { 
  'Poison': poisonIcon,
  'Tax': taxIcon,
  'Treasure': treasureIcon,
  'Rad': radIcon,
  'Exp': expIcon,
  'Energy': energyIcon,
  'Speed': speedIcon  
}
const cmd_dmg_open = ref(null);
const counters_open = ref(null);
const profile_open = ref(null);
const settings_open = ref(false);
const count = ref(Array(playerStore.players.length).fill(0));
const timers = Array(playerStore.players.length).fill(null);
//ramping increment stuff
const ramp_timers = Array(playerStore.players.length).fill(null);
const current_delays = Array(playerStore.players.length).fill(350)
let minDelay = 20;
let acceleration = 0.93;
function startAcceleration(i, func){
  func(i);
  current_delays[i] = Math.max(minDelay, current_delays[i] * acceleration);
  ramp_timers[i] = setTimeout(() => startAcceleration(i, func), current_delays[i] );
}

function resetDelay(i, func){
  if (ramp_timers[i] !== null) return;
  current_delays[i] = 350;
  startAcceleration(i, func);
}

function hpSize(hp){
  let str = String(hp);
  let max = Math.min(4.5, 9/(str.length-1))
  return { 'font-size': `${max}rem` };
}
function stopIncrement(i) {
  clearTimeout(ramp_timers[i])
  ramp_timers[i] = null;
}

function addLife(i){
  playerStore.addLife(i);
  count.value[i]++;
  xd(i);
}
function minusLife(i){
  playerStore.minusLife(i);
  count.value[i]--;
  xd(i);
}

function clearCount(i){
  count.value[i] = 0;
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


const chosenPlayer = ref(null);
function chooseRandomPlayer(){
  settings_open.value = false;
  if(chosenPlayer.value !== null) return;
  chosenPlayer.value = Math.floor((Math.random() * playerStore.actualPlayers.length));
  setTimeout(() => {
    chosenPlayer.value = null;
  }, 3000)
}

// onMounted(() => {
//   document.addEventListener("contextmenu", (event) => event.preventDefault());
// });
</script>

<style lang="scss" scoped>

.left-spacer{
  flex: 1 1 auto;
}
.chosen{
  animation: flash 1s ease-in-out 3;
}
@keyframes flash{
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.25); }
}
.status{
  position:absolute;
  display:flex;
}
.settings{
  width: 27px;
  aspect-ratio: 1;
  position:absolute;
  border-radius: 50%;
  background:rgb(255, 255, 255);
  z-index: 98;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.123);
  cursor: pointer;
  img{
    width: 90%;
    height: 90%;
    
  }
}
.test-img{
  position:absolute;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
 
}
.options-btn{
  position:absolute;
  background:white;
  display:block;
  width: 15px;
  aspect-ratio: 1;
  cursor:pointer;
  border:none;
  border-radius: 50%;
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
}

.box{
  flex: 0 0 auto;
  display:flex;
  gap: .1rem;
  font-size:calc(.6rem + 1vmin);
  border-radius: 1rem;
  background:white;
  pointer-events: auto;
}
.counter{
  font-size: 1.1rem;
  white-space: nowrap;
  z-index: 500;
}

.cmd-dmg{
  pointer-events: auto;
}
.settings-icon{
  position:absolute;
  background: rgba(56, 56, 56, 0.226);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  img{
    width: 100%;
    height: 100%;
  }
}
.hor-text{
  .bot-container{
    position:absolute;
    bottom:0;
    height: 25%;
    width: 100%;
    display:grid;
    grid-template-columns: 1fr 27% 1fr;
   
  }
  .names{
    background:white;
    padding: 0 1rem;
    border-radius: 1rem;
    position:absolute;
    top:5px;
    left:50%;
    transform:translate(-50%, 0);
  }
  .settings-icon{
    top:5px;
    left:50%;
    transform:translate(-50%, 0);
  }
  .counter{
    left: 50%;
    top: 22%;
    transform: translate(-50%, 0);
  }
  .box{
    bottom:2px;
    right:5%;
    height: min(100%, 60px);
    padding: .1rem 3%;
    justify-self: end;
    margin-right: .2rem;
    align-self: end;
    .test-grid{
      width: 20px;
    }
    .icon{
      min-height: 20px;
      max-height: 20px;
      min-width:15px;
      max-width:100%;
    }
  }
  .cmd-dmg{
    width: 100%;
    height:100%;
    bottom:2px;
  }
  .options-btn{
    bottom: 10px;
    right: 15px;
  }
  .plus-life{
    margin-left:50%;
  }
  .minus-life{
    margin-right:50%;
  }
  .ts{
    text-shadow: 0px 5px 4px rgba(0, 0, 0, 0.5);
  }
  .status{
    height: 40px;
    right: 0;
    top: 0;
  }
}


//vertical
.vertical-text{
  .bot-container{
    position:absolute;
    left:0;
    width: 25%;
    height: 100%;
    display:grid;
    grid-template-columns: 1fr 27% 1fr;

  }
  .names{
    background:white;
    padding: 1rem 0;
    border-radius: 1rem;
    position: absolute;
    right:5px;
    top:50%;
    transform: translate(0, -50%);
  }
  .settings-icon{
    right:5px;
    top:50%;
    transform:translate(0, -50%);
  }
  .counter{
    top: 50%;
    right: 22%;
    transform: translate(0, -50%);
  }
  .box{
    justify-self: end;
    width: min(100%, 60px);
    padding: 3% .1rem;
    margin-bottom: .2rem;
    align-self: end;
    .test-grid{
      height: 20px;
    }
    .icon{
      width:50%;
      max-width:20px;
      min-height:15px;
      max-height:100%;
      transform: rotate(90deg);
    }
  }
  .cmd-dmg{
    justify-self: center;
    width:100%;
    height: 100%;
  }
  .options-btn{
    left: 5px;
    top: 5%;
    transform: translate(0, -50%);
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
  .ts{
    text-shadow: -5px 0px 4px rgba(0, 0, 0, 0.5);
  }
  .status{
    width: 40px;
    right: 0;
    bottom: 0;
    img{
      transform: rotate(90deg);
    }
  }
}

.five, .five-alt, .six{
  .vertical-text{
    .bot-container{
      grid-template-columns: 1fr 40% 1fr;
    }
  }
}
.six-alt{
  .vertical-text{
    .bot-container{
      grid-template-columns: 1fr 45% 1fr;
    }
  }
}

.gap{
  gap: 2px;
}
//grids
.two{
  display:grid;
  grid-template-columns: 1;
  grid-template-rows: 1fr 1fr;
}

.three{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
}

.four{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.four-alt{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}

.five{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.3fr 1.3fr 1fr;
}

.five-alt{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
}

.six{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.six-alt{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.25fr 1.25fr 1fr;
}
</style>