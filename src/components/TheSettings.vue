<template>
  <div class="container">
    <div class="pad flex ac column gap">
      <button @click="playerStore.resetGame">Reset Game</button>
      
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

      <section>
        <div>Functions</div>
        <button>Choose Random Player</button>
        <div>
          <div>Coin</div>
          <div class="coin-container" @click="flipCoin">
            <div class="coin" :style="{ transform: `rotateX(${rotationAngle}deg)` }">
              <img class="coin-face front" :src="heads" alt="Heads">
              <img class="coin-face back" :src="tails" alt="Tails">
            </div>
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

const playerStore = usePlayerStore();
const numLayouts = [1,1,1,2,2,2];
const isFlipping = ref(false);
const rotationAngle = ref(0);

const flipCoin = () => {
  if (isFlipping.value) return;
  isFlipping.value = true;

  // Choose a random number of full rotations (2, 3, or 4 full spins)
  const extraRotations = Math.floor(Math.random() * 3) + 2;
  // Randomly decide the outcome: heads (0° offset) or tails (180° offset)
  const isHeads = Math.random() > 0.5;
  const baseAngle = 360 * extraRotations;
  const finalAngle = isHeads ? baseAngle : baseAngle + 180;
  
  // Update the rotation angle for the flip animation.
  rotationAngle.value += finalAngle;

  // Reset the flipping state after the animation completes (match duration with CSS)
  setTimeout(() => {
    isFlipping.value = false;
  }, 1000);
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: white;
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

.front {
  /* Heads is the front face */
}

.back {
  transform: rotateX(180deg);
}
</style>
