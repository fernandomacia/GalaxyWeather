<template>
    <img :src="iconUrl" alt="Weather Icon" />
</template>
  
<script>
    export default {
        props: ['icon'],
        computed: {
            iconUrl() {
                return `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
            },
        },
    };
</script>
  