<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import BadoriieLogo from './components/BadoriieLogo.vue'
</script>

<template>
  <header>
    <BadoriieLogo />
    <div class="wrapper">
      <HelloWorld/>
    </div>
  </header>


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: row;
    margin-top: 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
