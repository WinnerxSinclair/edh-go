<template>
  <div class="outer" @click="updateProfile">
    <div class="inner" @click.stop :class="useCounterClass(propIndex, playerStore.layout)">
      <div class="container flex column" >
        <div class="flex ac column gap">
          <input class="text-center name-change" type="text" v-model="form.name">

          <div class="flex jc gap wrap colors">
            <button 
              v-for="color in color_ops" :key="color"
              class="color-btn"
              :style="[{background: color}]"
              :class="{'selected-border': color === form.bgcolor}"
              @click="form.bgcolor = color"
            >
            </button>
          </div>

          <!-- <div>----Text Color----</div>
          <div class="flex-c-c gap">
            <button v-for="op in options.tc" :key="op" @click="form.tc = op" :class="{'btn-bg': form.tc === op}">{{ op }}</button>
          </div>

          <div>----Text Shadow----</div>
          <div class="flex-c-c gap">
            <button v-for="op in options.ts" :key="op" @click="form.ts = op" :class="{'btn-bg': form.ts === op}">{{ op }}</button>
          </div>

          <button @click="updateProfile">Save</button>
          <button @click="$emit('save')">Cancel</button> -->



          <div class="flex jc gap">
        <button class="counter-btn"
          :class="{'selected-light': playerStore.monarch_id === playerStore.players[propIndex].id }" 
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
          :class="{'selected-light': playerStore.init_id === playerStore.players[propIndex].id }" 
          @click="playerStore.init_id = playerStore.init_id === playerStore.players[propIndex].id ? 0 : playerStore.players[propIndex].id"
        >
          <img src="../assets/initiative.png" alt="">
          <div class="label">Initiative</div>
        </button>
      </div>
      <br>
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
import { ref } from 'vue'
import { useCounterClass } from 'src/use/useGetClass';
const playerStore = usePlayerStore();
const props = defineProps({
  propIndex: {
    type: Number,
    required: true
  }
});
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
const emit = defineEmits(['save'])
const options = {
  bg: ['Color'],
  tc: ['white','black'],
  ts: ['No', 'Yes']
}
const color_ops = ['#DB877D', '#A3DB7D', '#93D9E1', '#B57DDB', '#DBB57D', '#C8C6C9', '#7590ba', '#dbdb7d', '#db7dd2', '#d7b9ec'];
const form = ref({
  name: playerStore.players[props.propIndex].name,
  bgcolor: playerStore.players[props.propIndex].background,
  tc: playerStore.players[props.propIndex].text_color,
  ts: playerStore.players[props.propIndex].text_shadow
})



function updateProfile(){
  let snap = form.value;
  playerStore.updateProfile(props.propIndex, snap.name, snap.bgcolor, snap.tc, snap.ts);
  emit('save');
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
    transition: background 0.1s ease-in-out;
  }
  button:active{
    background:rgba(166, 166, 255, 0.664);
  }
}
.counter-grid{
  display:grid;
  grid-template-columns: 1fr 5fr 1fr;
  background: rgb(247, 247, 247);
  border-radius: .2rem;
}

.colors{
  padding: 1rem;
}

.name-change{
  padding: .2rem;
  font-size: 1rem;
}
.color-btn{
  width: 40px;
  aspect-ratio: 1;
}
.selected-border{
  box-shadow: 0 0 0 2px black;
}
.my-picker{
  max-width: 25px;

}
.container{
  width: 100%;
  background:rgb(220, 238, 252);
  text-align: center;
  border-radius: 1rem;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow:auto;
}


input{
  border: 1px solid black;
  border-radius: .1rem;
}
input:focus{
  border: 2px solid black;
  outline: none;
}

.card-img{
  width: 60px;
}

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
  align-items:center;
}

.back-btn{
  position:absolute;
  top: 1rem;
  left:1rem;
}

.hor-text{
  &.inner{
    width: 90%;
  }
  .container{
    padding:1rem 1rem 2rem 1rem;
  }

  .counter-grid{
    width: 30%;
    max-width: 70px;
    height: 60px;
  }
  .num{
    margin-top:.4rem;
  }
  .dynamic-mt{
    margin-top: 1rem;
  }
}

.vertical-text {
  writing-mode: vertical-rl;
  &.inner{
    max-height: 90%;
  }
  .container{
    padding-left: 1rem;
    padding-right: 1rem; 
  }
  .name-change{
    height: 60%;
  }

  .counter-grid{
    height: 30%;
    max-height: 60px;
    width: 60px;
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

.counter-btn{
  border-radius:.2rem;
  background: rgb(247, 247, 247);
}

.selected{
  background: rgba(162, 162, 255, 0.664);
}
.selected-light{
  background: rgba(222, 222, 255, 0.692);
  box-shadow: 0 0 0 1px rgb(129, 129, 255);
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
.plus,.minus{
  align-self:center;
}
.test{
  line-height: 1.1;
}
</style>
























<!-- async function findCards(){
  try{
    const response = await axios.get(`http://localhost:3000/api/card/${cardName.value}`);
    cardList.value = response.data.data;
  }catch(err){
    console.log(err);
  }
}

async function showPrints(oracle_id){
  try{
    const response = await axios.get(`http://localhost:3000/api/prints/${oracle_id}`);
    prints.value = response.data.data;
    printsFlag.value = true;
  }catch(err){
    console.log(err);
  }
}

function useThisCard(link){
  form.value.bgcard = link;
  cardList.value = null;
}
function clearPrints(){
  printsFlag.value = false;
  prints.value = null;
} -->






















      <!-- <div>{{ playerStore.players[propIndex].name }}'s Profiles
        <button @click="create_new = !create_new">{{ create_new ? 'Cancel' : 'Create New'}}</button>
      </div> -->


<!-- <div v-else class="flex ac column gap">
  <div>----Background----</div>
  <div class="flex-c-c gap">
    <button v-for="op in options.bg" :key="op" @click="bg_op = op" :class="{'btn-bg': bg_op === op}">{{ op }}</button>
  </div>

  <div v-if="bg_op === 'Card'">
    <input type="text" placeholder="Card Name" v-model="cardName">
    <button @click="findCards">Search</button>
  </div>

  <div v-if="bg_op === 'Color'">
    <q-color no-footer v-model="form.bgcolor" class="my-picker" />
  </div>

  <div v-for="card in cardList" :key="card.id" class="flex ac jc-sb w-100">
    <div class="tan">
      <div>{{ card.name }}</div>
      <div>{{ card.artist }}</div>
      <div class="fs-100">@ wizards of the coast</div>
      <div class="flex gap fs-200">
        <button @click="useThisCard(card.image_uris?.art_crop)">Use</button>
        <button @click="showPrints(card.oracle_id)">Prints</button>
      </div>

    </div>
    <img class="card-img" :src="card.image_uris?.small" alt="">
  </div>
  
  <div>----Text Color----</div>
  <div class="flex-c-c gap">
    <button v-for="op in options.tc" :key="op" @click="form.tc = op" :class="{'btn-bg': form.tc === op}">{{ op }}</button>
  </div>
  <div>----Text Shadow----</div>
  <div class="flex-c-c gap">
    <button v-for="op in options.ts" :key="op" @click="form.ts = op" :class="{'btn-bg': form.ts === op}">{{ op }}</button>
  </div>
  <button @click="updateProfile">Save</button>
</div>

<div v-if="printsFlag" class="outer">
  <button class="back-btn" @click="clearPrints">Go Back</button>
  <div class="inner prints-grid">
    <div v-for="print in prints" :key="print.id">
      <img class="inner-img" :src="print.image_uris?.art_crop" alt="">
      <div>{{ print.artist }}</div>
      <div class="fs-100">@ wizards of the coast</div>
    </div>
  </div>
</div> -->