import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { LocalStorage } from 'quasar'

export const usePlayerStore = defineStore('player', () => {
  

  const monarch_id = ref(0);
  const init_id = ref(0);
  const storedLife = LocalStorage.getItem('life');
  const life = ref(storedLife ? storedLife : 40);

  const defaultPlayers = [
    {
      id: 1,
      name: 'Player 1',
      life: life.value,
      background: '#DB877D',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
    {
      id: 2,
      name: 'Player 2',
      life: life.value,
      background: '#A3DB7D',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
    {
      id: 3,
      name: 'Player 3',
      life: life.value,
      background: '#93D9E1',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
    {
      id: 4,
      name: 'Player 4',
      life: life.value,
      background: '#B57DDB',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
    {
      id: 5,
      name: 'Player 5',
      life: life.value,
      background: '#DBB57D',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
    {
      id: 6,
      name: 'Player 6',
      life: life.value,
      background: '#C8C6C9',
      counters: {},
      dmg: [],
      dead: false,
      ascended: false,
    },
  ]


  const storedPlayers = LocalStorage.getItem('players');
  const storedLayout = LocalStorage.getItem('layout');
  const storedNumPlayers = LocalStorage.getItem('numPlayers');

  const storedAutoKO = LocalStorage.getItem('autoKO');
  const storedCmdLife = LocalStorage.getItem('cmdLife');

  const autoKO = ref(storedAutoKO ?? true);

  const cmdLife = ref(storedCmdLife ?? true);
  const numPlayers = ref(storedNumPlayers ? storedNumPlayers : 4);
  const layout = ref(storedLayout ? storedLayout : 'four');
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
    if(autoKO.value && actualPlayers.value[i].life-1 === 0 && actualPlayers.value[i].dead === true){
      actualPlayers.value[i].dead = false;
    }
  }
  function minusLife(i){
    actualPlayers.value[i].life--;
    if(autoKO.value && actualPlayers.value[i].life <= 0){
      actualPlayers.value[i].dead = true;
    }
  }

  function addCmdDmg(cmd_dmg_index, playerIndex, partner_index){
    actualPlayers.value[playerIndex].dmg[cmd_dmg_index][partner_index]++;
    if(cmdLife.value) minusLife(playerIndex);
    if(autoKO.value && actualPlayers.value[playerIndex].dmg[cmd_dmg_index][partner_index] >= 21 && !actualPlayers.value[playerIndex].dead){
      actualPlayers.value[playerIndex].dead = true;
    }
  }
  function minusCmdDmg(cmd_dmg_index, playerIndex, partner_index){
    actualPlayers.value[playerIndex].dmg[cmd_dmg_index][partner_index]--;
    if(cmdLife.value) addLife(playerIndex);
    if(actualPlayers.value[playerIndex].dmg[cmd_dmg_index][partner_index] < 21 && actualPlayers.value[playerIndex].dead){
      actualPlayers.value[playerIndex].dead = false;
    }
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
    if(autoKO.value && key === 'Poison' && actualPlayers.value[playerIndex].counters[key] >= 10){
      actualPlayers.value[playerIndex].dead = true;
    }
  }
  function minusCounter(key, playerIndex){
    if(!(key in actualPlayers.value[playerIndex].counters)) return;
    actualPlayers.value[playerIndex].counters[key]--;
    if(actualPlayers.value[playerIndex].counters[key] === 0){
      delete actualPlayers.value[playerIndex].counters[key]
    }
    if(autoKO.value && key === 'Poison' && actualPlayers.value[playerIndex].counters[key] < 10){
      actualPlayers.value[playerIndex].dead = false;
    }
  }

  function changePlayers(num){
    numPlayers.value = num;
    if(num === 3) layout.value = 'three';
    else if(num === 4) layout.value = 'four';
    else if(num === 5) layout.value = 'five';
    else if(num === 6) layout.value = 'six';
    else if(num === 2) layout.value = 'two';
    LocalStorage.set('numPlayers', numPlayers.value)
    LocalStorage.set('layout', layout.value);
  }

  const layoutArr = [0,0,0,0,['four','four-alt'],['five','five-alt'],['six','six-alt']]
  function changeLayout(num){
    layout.value = layoutArr[numPlayers.value][num];
    LocalStorage.set('layout', layout.value);
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


  function changeStartingLife(l){
    life.value = l;
    LocalStorage.set('life', life.value);
    resetGame();
  }

  function resetGame(){
    monarch_id.value = 0;
    init_id.value = 0;
    players.value.forEach((player) => {
      player.life = life.value;
      player.counters = {};
      player.dead = false;
      player.ascended = false;
      player.dmg.forEach((el, i) => {
        player.dmg[i] = [0];
      })
    })
  }
  resetGame();
  function updateAutoKO(){
    LocalStorage.set('autoKO', autoKO.value);
  }

  function updateCmdLife(){
    LocalStorage.set('cmdLife', cmdLife.value );
  }


  return { 
    players,
    layoutArr,
    numPlayers,
    layout,
    monarch_id,
    init_id,
    actualPlayers,
    life,
    autoKO,
    cmdLife,


    addLife, 
    minusLife,
    addCmdDmg,
    minusCmdDmg,
    addCounter,
    minusCounter,
    partnerFunc,
    changePlayers,
    changeLayout,
    changeStartingLife,
 

    updateProfile,
    resetGame,
    updateAutoKO,
    updateCmdLife

  
  }
})