<template>
  <div class="container" :class="useCounterClass(propIndex, playerStore.layout)">
    <div class="inner-wrap" >
      <div>Status</div>
      <div class="flex jc gap">
        <button class="counter-btn"
          :class="{'selected': playerStore.monarch_id === playerStore.players[propIndex].id }" 
          @click="playerStore.monarch_id = playerStore.monarch_id === playerStore.players[propIndex].id ? 0 : playerStore.players[propIndex].id"
        >
          <img src="../assets/crown.png" alt="" >
          <div class="label">Monarch</div>
        </button>
        <button class="counter-btn">
          <img src="../assets/ascend.png" alt="">
          <div class="label">Ascend</div>
        </button>
        <button class="counter-btn"
          :class="{'selected': playerStore.init_id === playerStore.players[propIndex].id }" 
          @click="playerStore.init_id = playerStore.init_id === playerStore.players[propIndex].id ? 0 : playerStore.players[propIndex].id"
        >
          <img src="../assets/initiative.png" alt="">
          <div class="label">Initiative</div>
        </button>
      </div>
      <div class="dynamic-mt">Counters</div>
      <div class="flex jc gap">

        <div 
          class="counter-grid bold rel"
          :class="{'selected-light': playerStore.players[propIndex].counters[key] }" 
          v-for="(val, key) in counters" :key="key"
        >
          <img class="smol minus" src="../assets/minus.svg" alt="">
          <div class="test">
            <img class="smol-2" :src="val" alt="">
            <div class="fs-100">{{ key }}</div>
            <div class="fs-100 num">{{ playerStore.players[propIndex].counters[key] || 0 }}</div>
          </div>
          <img class="smol plus" src="../assets/plus.svg" alt="">
          <div class="overlay">
            <button @click="minusCounter(key)"></button>
            <button @click="addCounter(key)"></button>
          </div>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script setup>
import poisonIcon from '../assets/poison.svg'
import taxIcon from '../assets/coin.png'
import treasureIcon from '../assets/treasure.png'
import radIcon from '../assets/rad.png'
import expIcon from '../assets/exp.png'
import energyIcon from '../assets/energy.png'
import speedIcon from '../assets/speed.png'
import { usePlayerStore } from 'src/stores/player-store';
import { useCounterClass } from 'src/use/useGetClass';
const props = defineProps({
  propIndex: {
    type: Number,
    required: true
  }
})
const playerStore = usePlayerStore();

const counters = { 
  'Poison': poisonIcon,
  'Tax': taxIcon,
  'Treasure': treasureIcon,
  'Rad': radIcon,
  'Exp': expIcon,
  'Energy': energyIcon,
  'Speed': speedIcon  
}
function addCounter(key){
  playerStore.addCounter(key, props.propIndex);
}
function minusCounter(key){
  playerStore.minusCounter(key, props.propIndex);
}

</script>
<style lang="scss" scoped>

.overlay{
  position:absolute;
  display:grid;
  grid-template-columns: 1fr 1fr;
  inset:0;
  button{
    background:transparent;
    transition: background 0.2s ease-in-out;
  }
  button:active{
    background:rgba(166, 166, 255, 0.664);
  }
}
.counter-grid{
  background:rgb(117, 117, 117);
  display:grid;
  grid-template-columns: 1fr 5fr 1fr;
  background: rgb(236, 236, 236);
  border-radius: .2rem;
  
}
.selected{
  background: rgba(162, 162, 255, 0.664);
}
.selected-light{
  background: rgba(202, 202, 255, 0.664);
  box-shadow: 0 0 0 1px rgb(129, 129, 255);
}
.hor-text{
  .counter-grid{
    width: 30%;
    max-width: 100px;
    height: 70px;
  }
  .num{
    margin-top:.4rem;
  }
  .dynamic-mt{
    margin-top: 1rem;
  }
}

.vertical-text{
  .counter-grid{
    height: 30%;
    max-height: 80px;
    width: 70px;
  }
  img{
    transform:rotate(90deg);
  }
  .num{
    margin-right: .4rem;
  }
  .dynamic-mt{
    margin-right: 1rem;
  }
}

.plus,.minus{
  align-self:center;
}
.container{
  width: 100%;
  height: 100%;
  background:white;
  text-align: center;
  border-radius: 1rem;
}
.test{
  line-height: 1.1;
}
.inner-wrap{
  padding:1rem;
}
button{
  border:none;
}
.counter-btn{
  border-radius:.2rem;
}
img{
  width:30px;
  height: 30px;
}
.smol{
  width:10px;
  height: 10px;
}
.smol-2{
  width:25px;
  height: 25px;
}
.label{
  font-size: .7rem;
  font-weight: bold;
}
</style>