<template>
    <main>
        <div class="container">
            <h1 class="title">Weather at:</h1>
            <weather-display 
                v-if="selectedCity" 
                :city="selectedCity" 
                :data="data" 
                :view="view" />
            <div class="buttons">
                <div class="mb-3">
                    <input v-model="newCity" type="text" class="form-control" placeholder="City..." @keyup.enter="handleEnterKey" />
                </div>
                <div v-if="error" class="alert alert-danger" role="alert">
                    {{ error }}
                </div>
                <div class="d-flex mb-4">
                    <button class="btn flex-fill me-2" :class="{'btn-primary': view === 'current', 'btn-secondary': view === 'forecast'}" @click="showCurrentWeather">Now</button>
                    <button class="btn flex-fill" :class="{'btn-primary': view === 'forecast', 'btn-secondary': view === 'current'}" @click="showForecast">Forecast</button>
                </div>
                <city-list :cities="cities" @citySelected="selectCity" @cityRemoved="removeCity" />
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import CityList from '../components/CityList.vue';
import WeatherDisplay from '../components/WeatherDisplay.vue';
import { saveCity, removeCity as removeCityStore, getCities } from '@/store/cityStore';
import { getWeatherByCity, getForecastByCity } from '@/services/weatherService';

const newCity = ref('');
const cities = ref(getCities());
const selectedCity = ref(null);
const data = ref(null);
const error = ref('');
const view = ref('current');

const addCity = async (cityName) => {
  if (cityName) {
    if (!cities.value.includes(cityName)) {
      saveCity(cityName);
      cities.value = getCities();
      newCity.value = '';
      error.value = '';
    }
  }
};

const selectCity = async (city) => {
  selectedCity.value = city;
  newCity.value = '';
  if (view.value === 'current') {
    await showCurrentWeather();
  } else {
    await showForecast();
  }
};

const removeCity = (city) => {
  removeCityStore(city);
  cities.value = getCities();
  if (selectedCity.value === city) {
    selectedCity.value = null;
    data.value = null;
  }
};

const showCurrentWeather = async () => {
  const city = newCity.value.trim() || selectedCity.value;
  if (city) {
    try {
      const response = await getWeatherByCity(city);
      const cityName = response.data.name;
      await addCity(cityName);
      selectedCity.value = cityName;
      data.value = response.data;
      error.value = '';
      view.value = 'current';
    } catch (err) {
      error.value = 'City not found. Please try another one.';
      data.value = null;
    }
  }
};

const showForecast = async () => {
  const city = newCity.value.trim() || selectedCity.value;
  if (city) {
    try {
      const response = await getForecastByCity(city);
      if (response && response.data) {
        const cityName = response.data.city.name;
        await addCity(cityName);
        selectedCity.value = cityName;
        data.value = response.data;
        view.value = 'forecast';
      } else {
        data.value = null;
      }
    } catch (err) {
      error.value = 'City not found. Please try another one.';
      data.value = null;
    }
  }
};

const handleEnterKey = () => {
  if (view.value === 'current') {
    showCurrentWeather();
  } else if (view.value === 'forecast') {
    showForecast();
  }
};
</script>

<style scoped>
    .buttons {
        max-width: 300px;
        margin: auto;
    }
</style>
