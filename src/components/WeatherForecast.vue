<template>
    <div v-if="data">
        <div class="weather-header">
            <h2 class="principal-text">{{ data.city.name }} {{ data.city.country }}</h2>
        </div>
        <div class="forecast-container">
            <div v-for="(day, index) in processedDailyForecasts" :key="index" class="forecast-card">
                <h3>{{ day.date }}</h3>
                <table class="forecast-table">
                    <thead>
                        <tr>
                            <th v-for="(label, labelIndex) in day.labels" :key="labelIndex">{{ label }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td v-for="(icon, iconIndex) in day.weatherIcons" :key="iconIndex">
                                <weather-icon :icon="icon" class="weather-icon"/>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(temperature, tempIndex) in day.temperatures" :key="tempIndex">
                                <div :class="{'temperature-cell': true, 'temperature-max': temperature === day.maxTemp, 'temperature-min': temperature === day.minTemp}">
                                    <font-awesome-icon v-if="temperature === day.maxTemp" :icon="['fas', 'arrow-up']" class="temp-icon hidden-on-small" />
                                    <font-awesome-icon v-if="temperature === day.minTemp" :icon="['fas', 'arrow-down']" class="temp-icon hidden-on-small" />
                                    {{ temperature }}°C
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(speed, windIndex) in day.windSpeeds" :key="windIndex">
                                <font-awesome-icon :icon="['fas', 'wind']" class="hidden-on-small"/>
                                {{ speed }} m/s</td>
                        </tr>
                        <tr>
                            <td v-for="(humidity, humidityIndex) in day.humidities" :key="humidityIndex">
                                <font-awesome-icon :icon="['fas', 'droplet']" />
                                {{ humidity }}%
                            </td>
                        </tr>
                        <tr>
                            <td v-for="(pressure, pressureIndex) in day.pressures" :key="pressureIndex">{{ pressure }} hPa</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
  
<script>
    import WeatherIcon from '@/components/WeatherIcon.vue'; 
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faArrowUp, faArrowDown, faWind, faDroplet } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    
    library.add(faArrowUp, faArrowDown, faWind, faDroplet);
    
    export default {
        components: { WeatherIcon, FontAwesomeIcon },
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        methods: {
            formatChartData(dayData) {
                if (!Array.isArray(dayData)) {
                    console.error('Expected an array but got:', dayData);
                    return this.initializeChartData();
                }    
                return {
                    labels: dayData.map(data => this.formatTime(data.dt)),
                    temperatures: this.extractData(dayData, 'main.temp'),
                    windSpeeds: this.extractData(dayData, 'wind.speed'),
                    humidities: this.extractData(dayData, 'main.humidity'),
                    pressures: this.extractData(dayData, 'main.pressure'),
                };
            },
            extractData(dayData, keyPath) {
                return dayData.map(data => this.getNestedValue(data, keyPath));
            },
            getNestedValue(obj, keyPath) {
                return keyPath.split('.').reduce((acc, key) => acc[key], obj);
            },
            formatTime(timestamp) {
                return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            },
            initializeChartData() {
                return {
                    labels: [],
                    temperatures: [],
                    windSpeeds: [],
                    humidities: [],
                    pressures: [],
                };
            },
            groupByDate(dataList) {
                return dataList.reduce((acc, data) => {
                    const date = new Date(data.dt * 1000).toLocaleDateString();
                    const currentDate = new Date().toLocaleDateString();
                    if (date !== currentDate) {
                        acc[date] = acc[date] || [];
                        acc[date].push(data);
                    }
                    return acc;
                }, {});
            },
            getWeatherIcons(dayData) {
                return dayData.map(data => data.weather[0].icon);
            },
            getMaxTemp(dayData) {
                return Math.max(...this.extractData(dayData, 'main.temp_max'));
            },
            getMinTemp(dayData) {
                return Math.min(...this.extractData(dayData, 'main.temp_min'));
            },
        },
        computed: {
            processedDailyForecasts() {
                if (!this.data || !this.data.list) return [];

                const groupedByDate = this.groupByDate(this.data.list);
                const futureDates = Object.keys(groupedByDate).sort().slice(0, 3);
                return futureDates.map(date => {
                    const dayData = groupedByDate[date];
                    return {
                        date,
                        weatherIcons: this.getWeatherIcons(dayData),
                        ...this.formatChartData(dayData),
                        maxTemp: this.getMaxTemp(dayData),
                        minTemp: this.getMinTemp(dayData),
                    };
                });
            }
        }
    };
</script>
  
<style scoped>
    .weather-header {
        text-align: center;
    }

    .forecast-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        text-align: center;
    }

    .forecast-card {
        width: 100%;
        max-width: 1000px;
        margin: 1rem;
        padding: 1.5rem;
        border-radius: 8px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: width 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .forecast-table {
        width: 100%;
        table-layout: auto; 
        border-collapse: collapse; 
    }

    .forecast-table th,
    .forecast-table td {
        padding: 0.5rem;
    }

    .icon-cell {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .weather-icon {
        width: 60px;
        height: 60px;
    }
    .temperature-cell {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        gap: 7px;
    }
    .temperature-max {
        font-weight: bold;
    }
    .temperature-min {
        font-weight: bold;
    }

    /* Responsividad */
    @media (max-width: 768px) {
        .forecast-container {
            max-width: 500px;
        }
        .forecast-card {
            max-width: 500px;
            padding: 1rem;
            overflow-x: auto; 
            white-space: nowrap;
            display: inline-block;
        }
        .weather-icon {
            width: 20px;
            height: 20px;
        }
        .forecast-table th,
        .forecast-table td {
            padding: 0.3rem;
            font-size: 0.9rem;
        }
        .hidden-on-small {
            display: none;
        }
    }
    @media (max-width: 575px) {
    .forecast-container {
        max-width: 300px; 
    }

    .forecast-card {
        max-width: 300px; 
        overflow-x: auto; 
        white-space: nowrap;
        display: inline-block;
    }
}
</style>
