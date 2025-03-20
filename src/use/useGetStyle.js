export function useSettingsIcon(layout){
  if(layout === 'four'){
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }
  if(layout === 'four-alt'){
    return {
      top: 'calc(73% - 9px)',
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  }
  if(layout === 'two'){
    return {
      top: '50%',
      right: '-3px',
      transform: 'translate(0, -50%)'
    }
  }
  if(layout === 'three'){
    return {
      top: 'calc(65% - 12px)',
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  }
  if(layout === 'five'){
    return {
      top: 'calc(71% - 14px)',
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  }
  if(layout === 'five-alt'){
    return {
      top: 'calc(50%)',
      left: '50%',
      transform: 'translate(-80%, -50%)'
    }
  }
  if(layout === 'six'){
    return {
      top: 'calc(66% - 10px)',
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  }
  if(layout === 'six-alt'){
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }
}