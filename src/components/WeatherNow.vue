<template>
    <div class="weather-info">
        <div class="weather-header">
            <h2 class="principal-text">{{ data.name }} {{ data.sys.country }}</h2>
            <div class="weather-main">
                <div class="weather-icon-container">
                    <weather-icon :icon="data.weather[0].icon" />
                    <p class="weather-description">{{ data.weather[0].description }}</p>
                </div>
                <div class="weather-temperature">
                    <p class="temperature-text">{{ data.main.temp }} °C</p>
                    <p>
                        <font-awesome-icon :icon="['fas', 'arrow-up']" />
                        {{ data.main.temp_max }} °C |
                        <font-awesome-icon :icon="['fas', 'arrow-down']" />
                        {{ data.main.temp_min }} °C
                    </p>
                </div>
            </div>
        </div>
        <div class="weather-details">
            <table>
                <tr>
                    <th>Pressure:</th>
                    <td>{{ data.main.pressure }} hPa</td>
                </tr>
                <tr>
                    <th>Humidity:</th>
                    <td>{{ data.main.humidity }} %</td>
                </tr>
                <tr>
                    <th>Visibility:</th>
                    <td>{{ data.visibility.toLocaleString() }} m</td>
                </tr>
                <tr>
                    <th>Wind:</th>
                    <td>{{ data.wind.speed }} m/s</td>
                </tr>
            </table>
        </div>
    </div>
</template>
  
<script>
    import WeatherIcon from './WeatherIcon.vue';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
    library.add(faArrowUp, faArrowDown);
  
    export default {
        components: { WeatherIcon, FontAwesomeIcon },
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    };
</script>
  
<style scoped>
    .weather-info {
        padding: 20px;
    }
    .weather-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .weather-main {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .weather-icon-container {
        margin-right: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .weather-description {
        position: absolute;
        bottom: -10%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
    }
    .weather-temperature {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-top: 17px;
    }
    .principal-text {
        font-size: 3em;
    }
    .temperature-text {
        font-size: 2em;
    }
    .weather-details {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        border-collapse: collapse;
    }
    .weather-details table {
        width: 100%;
        border-collapse: collapse;
    }
    .weather-details th, .weather-details td {
        text-align: left;
        padding: 10px;
    }
    .weather-details th {
        font-weight: bold;
        border-bottom: 1px solid #ddd; 
    }
    .weather-details td {
        border-bottom: 1px solid #ddd; 
    }
    .weather-details tr:last-child th,
    .weather-details tr:last-child td {
        border-bottom: none; 
    }
</style>
  