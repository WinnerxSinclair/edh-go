//main grid
export function useGetClass(i, layout){

  if(layout === 'two'){
    return [{'rotate-180': i === 0}, 'hor-text']
  }

  if(layout === 'three'){
    return [
      {'rotate-180': i === 1 },
      (i === 0 || i === 1) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 2}
    ]
  }
  
  if(layout === 'four'){
    return [
      {'rotate-180': i === 1 || i === 3},
      'vertical-text',
    ]
  }

  if(layout === 'four-alt'){
    return [
      {'rotate-180': i === 0 || i === 2},
      (i === 1 || i === 2) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 0 || i === 3},
    ]
  }

  if(layout === 'five'){
    return [
      {'rotate-180': i === 1 || i === 3},
      (i !== 4) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 4},
    ]
  }

  if(layout === 'five-alt'){
    return [
      {'rotate-180': i === 1 || i === 2 || i === 4 },
      'vertical-text',
      (i == 0 || i == 3) ? 'span-row-3' : 'span-row-2'
    ]
  }

  if(layout === 'six'){
    return [
      {'rotate-180': i === 1 || i === 3 || i === 5},
      'vertical-text',
    ]
  }

  if(layout === 'six-alt'){
    return [
      {'rotate-180': i === 0 || i === 2 || i === 4},
      (i === 1 || i === 2 || i === 3 || i === 4) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 0 || i === 5},
    ]
  }
  return [];
}



//commander dmg mini
export function useCommanderDmgLayout(i, layout, index){
  if(layout === 'four-alt'){
    return [
      {'ga-four-alt-1 column': i === 0},
      {'ga-four-alt-2': i === 1},
      {'ga-four-alt-3': i === 2},
      {'ga-four-alt-4 column': i === 3},
      
    ]
  }

  if(layout === 'four'){
    return [
      {'ga-four-1': i === 0},
      {'ga-four-2': i === 1},
      {'ga-four-3': i === 2},
      {'ga-four-4': i === 3}
    ]
  }

  if(layout === 'three'){
    return [
      {'ga-three-1': i === 0},
      {'ga-three-2': i === 1},
      {'ga-three-3 column': i === 2},
      {'rotate-180': index === 1}
    ]
  }

  if(layout === 'five'){
    return [
      {'ga-five-1': i === 0},
      {'ga-five-2': i === 1},
      {'ga-five-3': i === 2},
      {'ga-five-4': i === 3},
      {'ga-five-5 column': i === 4},
    ]
  }

  if(layout === 'five-alt'){
    return [
      {'ga-five-alt-1': i === 0},
      {'ga-five-alt-2': i === 1},
      {'ga-five-alt-3': i === 2},
      {'ga-five-alt-4': i === 3},
      {'ga-five-alt-5': i === 4},
    ]
  }

  if(layout === 'six'){
    return [
      {'ga-six-1': i === 0},
      {'ga-six-2': i === 1},
      {'ga-six-3': i === 2},
      {'ga-six-4': i === 3},
      {'ga-six-5': i === 4},
      {'ga-six-6': i === 5},
    ]
  }

  if(layout === 'six-alt'){
    return [
      {'ga-six-alt-1 column': i === 0},
      {'ga-six-alt-2': i === 1},
      {'ga-six-alt-3': i === 2},
      {'ga-six-alt-4': i === 3},
      {'ga-six-alt-5': i === 4},
      {'ga-six-alt-6 column': i === 5},
    ]
  }

  if(layout === 'two'){
    return [
      {'ga-two-1': i === 0},
      {'ga-two-2': i === 1},
    ]
  }

  return [];
}



//commander dmg mini rotate
export function useRotateCommanderDmg(i, layout){

  if(layout === 'four-alt'){
    return [
      {'rotate-180': i === 0 || i === 2},
    ]
  }

  if(layout === 'four'){
    return [
      {'rotate-180': i === 1 || i === 3},
    ]
  }

  if(layout === 'three'){
    return [
      {'rotate-180': i === 1},
    ]
  }

  if(layout === 'five'){
    return [
      {'rotate-180': i === 1 || i === 3 },
    ]
  }

  if(layout === 'five-alt'){
    return [
      {'rotate-180': i === 1 || i === 2 || i === 4 },
    ]
  }

  if(layout === 'six'){
    return [
      {'rotate-180': i === 1 || i === 3 || i === 5},
    ]
  }

  if(layout === 'six-alt'){
    return [
      {'rotate-180': i === 0 || i === 2 || i === 4},
    ]
  }

  if(layout === 'two'){
    return [
      {'rotate-180': i === 0},
    ]
  }

  return [];
}


//counters page
export function useCounterClass(i, layout){

  if(layout === 'two'){
    return [{'rotate-180': i === 0}, 'hor-text']
  }

  if(layout === 'three'){
    return [
      {'rotate-180': i === 1 },
      (i === 0 || i === 1) ? 'vertical-text' : 'hor-text',
    ]
  }
  
  if(layout === 'four'){
    return [
      {'rotate-180': i === 1 || i === 3},
      'vertical-text',
    ]
  }

  if(layout === 'four-alt'){
    return [
      {'rotate-180': i === 0 || i === 2},
      (i === 1 || i === 2) ? 'vertical-text' : 'hor-text',
    ]
  }

  if(layout === 'five'){
    return [
      {'rotate-180': i === 1 || i === 3},
      (i !== 4) ? 'vertical-text' : 'hor-text',
    ]
  }

  if(layout === 'five-alt'){
    return [
      {'rotate-180': i === 1 || i === 2 || i === 4 },
      'vertical-text',
    ]
  }

  if(layout === 'six'){
    return [
      {'rotate-180': i === 1 || i === 3 || i === 5},
      'vertical-text',
    ]
  }

  if(layout === 'six-alt'){
    return [
      {'rotate-180': i === 0 || i === 2 || i === 4},
      (i === 1 || i === 2 || i === 3 || i === 4) ? 'vertical-text' : 'hor-text',
      
    ]
  }
  return [];
}



//commander dmg big grid
export function useCmdDmgBigLayout(i, layout, propIndex){

  if(layout === 'two'){
    return [{'rotate-180': propIndex === 0}, 'hor-text']
  }

  if(layout === 'three'){
    return [
      {'rotate-180': propIndex === 1 },
      (propIndex === 0 || propIndex === 1) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 2 },
      {'column': ((propIndex === 0 || propIndex === 1) && (i === 2)) || 
                 ((propIndex === 2 ) && (i === 0 || i === 1))  
      }
    ]
  }
  
  if(layout === 'four'){
    return [
      {'rotate-180': propIndex === 1 || propIndex === 3},
      'vertical-text',
    ]
  }

  if(layout === 'four-alt'){
    return [
      {'rotate-180': propIndex === 0 || propIndex === 2},
      (propIndex === 1 || propIndex === 2) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 0 || i === 3},
      {'column': ((propIndex === 0 || propIndex === 3) && (i === 1 || i === 2)) || 
                 ((propIndex === 1 || propIndex === 2) && (i === 0 || i === 3))  
      }
    ]
  }

  if(layout === 'five'){
    return [
      {'rotate-180': propIndex === 1 || propIndex === 3},
      (propIndex !== 4) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 4},
      {'column': (propIndex !== 4 && i === 4) || 
                 (propIndex === 4  && i !== 4)  
      }
    ]
  }

  if(layout === 'five-alt'){
    return [
      {'rotate-180': propIndex === 1 || propIndex === 2 || propIndex === 4 },
      'vertical-text',
      (i == 0 || i == 3) ? 'span-row-3' : 'span-row-2'
    ]
  }

  if(layout === 'six'){
    return [
      {'rotate-180': propIndex === 1 || propIndex === 3 || propIndex === 5},
      'vertical-text', 
      'column'
    ]
  }

  if(layout === 'six-alt'){
    return [
      {'rotate-180': propIndex === 0 || propIndex === 2 || propIndex === 4},
      (propIndex === 1 || propIndex === 2 || propIndex === 3 || propIndex === 4) ? 'vertical-text' : 'hor-text',
      {'span-2': i === 0 || i === 5},
      {'column': ((propIndex !== 5 && propIndex !== 0) || ((propIndex === 5 || propIndex === 0) && (i !== 5 && i !== 0))) 
      }

    ]
  }
  return [];
}








