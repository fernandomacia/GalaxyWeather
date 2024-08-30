<template>
    <div class="outer-container">
      <HomeView />
    </div>
  </template>
  
  <script setup>
  import HomeView from './views/HomeView.vue';
  </script>
  
  <style scoped>
    .outer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
  </style>
  
