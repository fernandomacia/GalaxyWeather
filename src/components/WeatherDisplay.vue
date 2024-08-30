<template>
    <div>
        <WeatherNow v-if="view === 'current' && data" :data="data" />
        <WeatherForecast v-if="view === 'forecast' && data" :data="data" />
    </div>
</template>
  
<script>
    import WeatherNow from './WeatherNow.vue';
    import WeatherForecast from './WeatherForecast.vue';
  
    export default {
        components: { WeatherNow, WeatherForecast },
        props: {
            data: {
                type: Object,
                required: true
            },
            view: {
                type: String,
                required: true
            }
        }
    };
</script>
  