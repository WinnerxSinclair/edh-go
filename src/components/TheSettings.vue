<template>
  <div class="container">
    <div class="pad flex ac column gap">
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
        <div class="flex gap wrap functions mt-3">
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
            <img src="../assets/d20.png" alt="">
          </div>
          <div>
            <div>D12</div>
            <img src="../assets/d12.png" alt="">
          </div>
          <div>
            <div>D10</div>
            <img src="../assets/d10.png" alt="">
          </div>
          <div>
            <div>D8</div>
            <img src="../assets/d8.png" alt="">
          </div>
          <div>
            <div>D6</div>
            <img src="../assets/d6.png" alt="">
          </div>
          <div>
            <div>D4</div>
            <img src="../assets/d4.png" alt="">
          </div>

        </div>
       
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlayerStore } from 'src/stores/player-store';
import heads from '../assets/heads.png'
import tails from '../assets/tails.png'
const emit = defineEmits(['choose'])
const playerStore = usePlayerStore();
const numLayouts = [1,1,1,2,2,2];
const isFlipping = ref(false);
const rotationAngle = ref(0);

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

function resetGame(){
  playerStore.resetGame();
  emit('choose');
}
</script>

<style lang="scss" scoped>
button{
  background:white;
}
.btn-bg{
  background: rgb(176, 176, 255);
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
