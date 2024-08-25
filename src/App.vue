<template>
    <div class="outer-container">
        <div class="container">
            <h1 class="title">Weather at:</h1>
            <weather-display 
                v-if="selectedCity" 
                :key="selectedCity + (forecastData ? 'forecast' : 'current')" 
                :city="selectedCity" 
                :weatherData="weatherData" 
                :forecastData="forecastData" />
            <div>
                <div class="mb-3">
                    <input v-model="newCity" type="text" class="form-control" placeholder="City..." @keyup.enter="handleEnterKey" />
                </div>
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
                <div class="d-flex mb-4">
                    <button class="btn flex-fill me-2" :class="{'btn-primary': !forecastData, 'btn-secondary': forecastData}" @click="showCurrentWeather">Now</button>
                    <button class="btn flex-fill" :class="{'btn-primary': forecastData, 'btn-secondary': !forecastData}" @click="showForecast">Forecast</button>
                </div>
                <city-list :cities="cities" @citySelected="selectCity" @cityRemoved="removeCity" />
            </div>
        </div>
    </div>
</template>

<script>
import CityList from './components/CityList.vue';
import WeatherDisplay from './components/WeatherDisplay.vue';
import { saveCity, removeCity, getCities } from '@/store/cityStore';
import { getWeatherByCity, getForecastByCity } from '@/services/weatherService';

export default {
    components: { CityList, WeatherDisplay },
    data() {
        return {
            newCity: '',
            cities: JSON.parse(localStorage.getItem('cities')) || [],
            selectedCity: null,
            weatherData: null,
            forecastData: null,
            error: '',
            view: 'current'
        };
    },
    methods: {
        async addCity(cityName) {
            if (cityName) {
                const cities = getCities();
                if (!cities.includes(cityName)) {
                    saveCity(cityName);
                    this.cities = getCities();
                    this.newCity = '';
                    this.error = '';
                }
            }
        },
        async selectCity(city) {
            this.selectedCity = city;
            this.newCity = '';
            if (this.view === 'current') {
                await this.showCurrentWeather();
            } else {
                await this.showForecast();
            } 
        },
        removeCity(city) {
            removeCity(city);
            this.cities = getCities();
            if (this.selectedCity === city) {
                this.selectedCity = null;
                this.weatherData = null;
                this.forecastData = null;
            }
        },
        async showCurrentWeather() {
            const city = this.newCity.trim() || this.selectedCity;
            if (city) {
                try {
                    const response = await getWeatherByCity(city);
                    const cityName = response.data.name;
                    this.addCity(cityName);
                    this.selectedCity = cityName;
                    this.weatherData = response.data;
                    this.forecastData = null;
                    this.error = '';
                    this.view = 'current';
                } catch (err) {
                    this.error = 'City not found. Please try another one.';
                    this.weatherData = null;
                    this.forecastData = null;
                }
            }
        },
        async showForecast() {
            const city = this.newCity.trim() || this.selectedCity;
            if (city) {
                try {
                    const response = await getForecastByCity(city);
                    if (response && response.data) {
                        const cityName = response.data.city.name;
                        this.addCity(cityName);
                        this.selectedCity = cityName;
                        this.forecastData = response.data;
                        this.weatherData = null;
                        this.view = 'forecast';
                    } else {
                        this.forecastData = null;
                    }
                } catch (err) {
                    this.error = 'City not found. Please try another one.';
                    this.weatherData = null;
                    this.forecastData = null;
                }
            }
        },
        handleEnterKey() {
            if (this.view === 'current') {
                this.showCurrentWeather();
            } else if (this.view === 'forecast') {
                this.showForecast();
            }
        }
    },
};
</script>

<style scoped>
    .outer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        width: 100%;
        max-width: 1200px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    }

    .title {
        font-size: 1.5em;
        margin-bottom: 1rem;
    }
</style>
