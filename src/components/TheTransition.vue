<template>
<Transition name="fade">
  <slot></slot>
</Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active{
  transition: opacity .2s ease-in-out;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active .inner, .fade-leave-active .inner{
  transition: transform .2s ease-in-out;
}
.fade-enter-from .inner, .fade-leave-to .inner{
  transform: translateX(-200px);
}
.fade-enter-active .inner-alt, .fade-leave-active .inner-alt{
  transition: transform .2s ease-in-out;
}
.fade-enter-from .inner-alt, .fade-leave-to .inner-alt{
  transform: translateX(-200px);
}
</style>