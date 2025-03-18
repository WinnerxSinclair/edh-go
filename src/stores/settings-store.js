import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useSettingsStore = defineStore('settings', () => {
    const storedShowNames = LocalStorage.getItem('shownames');
    const storedShowGrid = LocalStorage.getItem('showgrid');
    const storedShowSettings = LocalStorage.getItem('showsettings')

    const showNames = ref(storedShowNames ? storedShowNames : true);
    const showGrid = ref(storedShowGrid ? storedShowGrid : true);
    const showSettings = ref(storedShowSettings ? storedShowSettings : true);

    function updateShowGrids(){
      LocalStorage.set('showgrid', showGrid.value);
    }
  
    function updateShowNames(){
      LocalStorage.set('shownames', showNames.value );
    }

    function updateShowSettings(){
      LocalStorage.set('showsettings', showSettings.value );
    }

    const storm = ref([0,0,0,0,0,0,0]);
    function clearStorm(){
      storm.value = storm.value.map((el) => el = 0);
    }
    return {
      showGrid,
      showNames,
      showSettings,
      storm,

      updateShowGrids,
      updateShowNames,
      updateShowSettings,
      clearStorm
    }
})