<template>
  <div class="outer" @click="updateProfile">
    <div class="inner" @click.stop>
      <div class="container flex ac column">
        <div class="flex column gap">
          <input class="text-center " type="text" v-model="form.name">

          <div class="flex gap wrap">
            <button 
              v-for="color in color_ops" :key="color"
              class="color-btn"
              :style="[{background: color}]"
              :class="{'selected-border': color === form.bgcolor}"
              @click="form.bgcolor = color"
            >
            </button>
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
          <button @click="$emit('save')">Cancel</button>
        </div> 
      </div>
    </div>
  </div>

</template>


<script setup>
import { usePlayerStore } from 'src/stores/player-store';
import { ref } from 'vue'

const playerStore = usePlayerStore();
const props = defineProps({
  propIndex: {
    type: Number,
    required: true
  }
});

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
.color-btn{
  width: 40px;
  aspect-ratio: 1;
}
.selected-border{
  box-shadow: 0 0 0 1px black;
}
.my-picker{
  max-width: 25px;

}
.container{
  width: 100%;
  height: 100%;
  background:white;
  text-align: center;
  border-radius: 1rem;
  padding:1rem;
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
button{
  border-radius: .1rem;
  padding: .1em 1em;
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
  width: 90%;
  height:85%;
}

.back-btn{
  position:absolute;
  top: 1rem;
  left:1rem;
  
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