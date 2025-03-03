import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { LocalStorage } from 'quasar'

export const usePlayerStore = defineStore('player', () => {
  
  const numPlayers = ref(3);
  const layout = ref('three');
  const monarch_id = ref(0);
  const init_id = ref(0);
  const life = ref(40);
  
  const defaultPlayers = [
    {
      id: 1,
      name: 'Christopher',
      life: 400,
      background: '#DB877D',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      monarch: false,
      dmg: [],
    },
    {
      id: 2,
      name: 'Christopher',
      life: 40,
      background: '#A3DB7D',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      dmg: [],
    },
    {
      id: 3,
      name: 'Christopher',
      life: 40,
      background: '#93D9E1',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      dmg: [],
    },
    {
      id: 4,
      name: 'Christopher',
      life: 40,
      background: '#B57DDB',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      dmg: [],
    },
    {
      id: 5,
      name: 'Christopher',
      life: 40,
      background: '#DBB57D',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      dmg: [],
    },
    {
      id: 6,
      name: 'Christopher',
      life: 40,
      background: '#C8C6C9',
      text_color: 'black',
      text_shadow: false,
      counters: {},
      dmg: [],
    },
  ]


  const storedPlayers = LocalStorage.getItem('players');
  
  const players = ref(storedPlayers ? storedPlayers : defaultPlayers);
  const actualPlayers = computed(() => {
    return players.value.slice(0, numPlayers.value);
  })


  watch(layout, (newVal) => {
    players.value.sort((a,b) => a.id - b.id);
    let desired;
    if(newVal === 'four'){
      desired = [1, 2, 0, 3, 4, 5];
    }
    else if(newVal === 'four-alt'){
      desired = [2, 1, 3, 0, 4, 5];
    }
    else if(newVal === 'two'){
      desired = [1, 0, 2, 3, 4, 5];
    }
    else if(newVal === 'three'){
      desired = [1, 2, 0, 3, 4, 5];
    }
    else if(newVal === 'five'){
      desired = [2, 3, 1, 4, 0, 5];
    }
    else if(newVal === 'five-alt'){
       desired = [1, 2, 3, 0, 4, 5];
    }
    else if(newVal === 'six'){
      desired = [2, 3, 1, 4, 0, 5];
    }
    else if(newVal === 'six-alt'){
      desired = [3, 2, 4, 1, 5, 0];
    }
    players.value = desired.map((i) => players.value[i]);
    players.value.forEach((el, i) => {
      el.dmg = [...new Array(numPlayers.value)].map(_ => new Array(1).fill(0));
    })
  }, {immediate: true})

  function addLife(i){
    actualPlayers.value[i].life++;
  }
  function minusLife(i){
    actualPlayers.value[i].life--;
  }

  function addCmdDmg(playerIndex, cmd_dmg_index, partner_index){
    actualPlayers.value[cmd_dmg_index].dmg[playerIndex][partner_index]++;
  }
  function minusCmdDmg(playerIndex, cmd_dmg_index, partner_index){
    actualPlayers.value[cmd_dmg_index].dmg[playerIndex][partner_index]--;
  }

  function partnerFunc(cmd_dmg_index){
    const method = actualPlayers.value[0].dmg[cmd_dmg_index].length === 2 ? 'pop' : 'push';
    const val = method === 'pop' ? [] : [0];
    actualPlayers.value.forEach((player) => {
      player.dmg[cmd_dmg_index][method](...val);
    }) 
  }

  function addCounter(key, playerIndex){
    if(!(key in actualPlayers.value[playerIndex].counters)){
      actualPlayers.value[playerIndex].counters[key] = 1;
    }else{
      actualPlayers.value[playerIndex].counters[key]++;
    }
  }
  function minusCounter(key, playerIndex){
    if(!(key in actualPlayers.value[playerIndex].counters)) return;
    actualPlayers.value[playerIndex].counters[key]--;
    if(actualPlayers.value[playerIndex].counters[key] === 0){
      delete actualPlayers.value[playerIndex].counters[key]
    }
  }

  function changePlayers(num){
    numPlayers.value = num;
    if(num === 3) layout.value = 'three';
    else if(num === 4) layout.value = 'four';
    else if(num === 5) layout.value = 'five';
    else if(num === 6) layout.value = 'six';
    else if(num === 2) layout.value = 'two';
  }

  const layoutArr = [0,0,0,0,['four','four-alt'],['five','five-alt'],['six','six-alt']]
  function changeLayout(num){
    layout.value = layoutArr[numPlayers.value][num];
  }

  const colors = ['#DB877D', '#A3DB7D', '#93D9E1', '#B57DDB', '#DBB57D', '#C8C6C9', '#7590ba', '#db7dd2', '#d97ed4'];
  function updateProfile(playerIndex, name, bg, tc, ts){
    let player = actualPlayers.value[playerIndex];
    let ts_val = ts === 'No' ? false : true;
  
    if(bg !== player.background && actualPlayers.value.length < 6){
      let playerColors = {};
      players.value.forEach((player, i) => playerColors[player.background] = i);
      let playerColorKeys = Object.keys(playerColors);
      
      if(playerColorKeys.includes(bg) && playerColors[bg] > actualPlayers.value.length-1){
        let unselected = colors.filter((color) => !playerColorKeys.includes(color));
        let randColor = unselected[Math.floor(Math.random() * unselected.length)];
        
        players.value[playerColors[bg]].background = randColor;
      }  
    }

    [player.name, player.background, player.text_color, player.text_shadow] = [name, bg, tc, ts_val];
    LocalStorage.set('players', players.value);
  }


  function resetGame(){
    monarch_id.value = 0;
    init_id.value = 0;
    players.value.forEach((player) => {
      player.life = life.value;
      player.counters = {};
      player.dmg.forEach((el, i) => {
        player.dmg[i] = [0];
      })
    })
  }


  return { 
    players,
    layoutArr,
    numPlayers,
    layout,
    monarch_id,
    init_id,
    actualPlayers,

    addLife, 
    minusLife,
    addCmdDmg,
    minusCmdDmg,
    addCounter,
    minusCounter,
    partnerFunc,
    changePlayers,
    changeLayout,
 

    updateProfile,
    resetGame
  
  }
})