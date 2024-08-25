<template>
    <div>
        <WeatherNow v-if="weatherData" :weatherData="weatherData" />
        <WeatherForecast v-if="forecastData" :forecastData="forecastData" />
    </div>
</template>
  
<script>
    import WeatherNow from './WeatherNow.vue';
    import WeatherForecast from './WeatherForecast.vue';
  
    export default {
        components: { WeatherNow, WeatherForecast },
        props: ['weatherData', 'forecastData']
    };
</script>
  