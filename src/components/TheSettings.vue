<template>
  <div class="container flex jc sb">
    <div class="pad flex ac column gap" v-if="setting_type === 'Game'">
      <button @click="resetGame" class="flex-c-c gap mc">
        <img class="icon" src="../assets/reset.png" alt="">
        Reset Game
      </button>
      
      <section>
        <div># Players</div>
        <div class="flex gap">
          <button 
            v-for="n in 5" :key="n" 
            @click="playerStore.changePlayers(n+1)"
            :class="{'btn-bg': n+1 === playerStore.numPlayers}"
          >
            {{ n+1 }}
          </button>
        </div>
      </section>

      <section v-if="playerStore.numPlayers > 3">
        <div>Layout</div>
        <div class="flex gap">
          <button 
            v-for="n in numLayouts[playerStore.numPlayers-1]" :key="n" 
            @click="playerStore.changeLayout(n-1)"
            :class="{'btn-bg': playerStore.layoutArr[playerStore.numPlayers][n-1] === playerStore.layout }"
          >
            {{ n }}
          </button>
        </div>
      </section>
      <br>
      <section>
        <button class="flex-c-c gap mc" @click="$emit('choose')">
          <img class="icon" src="../assets/group.png" alt="">
          Pick Random Player
        </button>
        <div class="flex jc gap wrap functions mt-3">
          <div>
            <div>Coin</div>
            <div class="coin-container" @click="flipCoin">
              <div class="coin" :style="{ transform: `rotateX(${rotationAngle}deg)` }">
                <img class="coin-face front" :src="heads" alt="Heads">
                <img class="coin-face back" :src="tails" alt="Tails">
              </div>
            </div>
          </div>
          
          <div>
            <div>D20</div>
            <img @click="letsRumble(20)" :class="{rumble: rumble === 20}" src="../assets/d20.png" alt="">
          </div>
          <div>
            <div>D12</div>
            <img @click="letsRumble(12)" :class="{rumble: rumble === 12}" src="../assets/d12.png" alt="">
          </div>
          <div>
            <div>D10</div>
            <img @click="letsRumble(10)" :class="{rumble: rumble === 10}" src="../assets/d10.png" alt="">
          </div>
          <div>
            <div>D8</div>
            <img @click="letsRumble(8)" :class="{rumble: rumble === 8}" src="../assets/d8.png" alt="">
          </div>
          <div>
            <div>D6</div>
            <img @click="letsRumble(6)" :class="{rumble: rumble === 6}" src="../assets/d6.png" alt="">
          </div>
          <div>
            <div>D4</div>
            <img @click="letsRumble(4)" :class="{rumble: rumble === 4}" src="../assets/d4.png" alt="">
          </div>

        </div>
        <div class="die-value fs-600">{{dieValue}}</div>
      </section>
    </div>
    <div class="pad flex ac column gap" v-else>

    </div>
    <div class="footer">
      <button>Game</button>
      <button>Display</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { usePlayerStore } from 'src/stores/player-store';
import heads from '../assets/heads.png'
import tails from '../assets/tails.png'
const emit = defineEmits(['choose'])
const playerStore = usePlayerStore();
const numLayouts = [1,1,1,2,2,2];
const isFlipping = ref(false);
const rotationAngle = ref(0);
const rumble = ref(null);
const dieValue = ref(0);
const setting_type = ref('Game')
const flipCoin = () => {
  if (isFlipping.value) return;
  isFlipping.value = true;

  const extraRotations = Math.floor(Math.random() * 3) + 2;
  const isHeads = Math.random() > 0.5;
  const baseAngle = 360 * extraRotations;
  const finalAngle = isHeads ? baseAngle : baseAngle + 180;
  
  rotationAngle.value += finalAngle;

  setTimeout(() => {
    isFlipping.value = false;
  }, 1000);
};

let intervalId;
function letsRumble(i){
  if(rumble.value !== null) return;
  rumble.value = i;
  let count = 0;
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    count++;
    dieValue.value = Math.floor(Math.random() * i)+1;
    if(count >= 10) clearInterval(intervalId);
  }, 50)
  
  setTimeout(() => {
    rumble.value = null;
  }, 500)

}
function resetGame(){
  playerStore.resetGame();
  emit('choose');
}

onUnmounted(() => clearInterval(intervalId));
</script>

<style lang="scss" scoped>
.footer{
  margin-top: auto;
  width: 100%;
  button{
    width: 30%;
  }
}
.rumble{
  animation: rumble .5s linear 1;
}
@keyframes rumble {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
button{
  background:white;
  padding: .2em 1em;
}
.btn-bg{
  background: rgb(218, 218, 255);
  border:1px solid black;
}
.icon{
  width: 30px;
}
.container {
  width: 100%;
  height: 100%;
  background: rgb(224, 224, 224);
  text-align: center;
  border-radius: 1rem;
}

.coin-container {
  width: 50px;
  height: 50px;
  perspective: 1000px;
  margin: auto;
}

.coin {
  width: 50px;
  height: 50px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease-in-out;
}

.coin-face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

}

.back {
  transform: rotateX(180deg);
}

.functions{
  img{
    width: 50px;
    height: 50px;
  }
}
</style>
