<template>
    <div v-if="data && Object.keys(data).length > 0">
        <WeatherNow v-if="view === 'current' && data" :data="data" />
        <WeatherForecast v-if="view === 'forecast' && data" :data="data" />
    </div>
    <p v-else>No data available</p>
</template>
  
<script>
    import WeatherNow from './WeatherNow.vue';
    import WeatherForecast from './WeatherForecast.vue';
  
    export default {
        components: { WeatherNow, WeatherForecast },
        props: {
            data: {
                type: Object,
                required: true,
                default: () => ({}),
                validator(value) {
                    return typeof value === 'object' && value !== null;
                }
            },
            city: {
                type: String,
                required: true
            },
            view: {
                type: String,
                required: true
            }
        }
    };
</script>
  