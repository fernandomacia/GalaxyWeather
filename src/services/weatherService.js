import axios from 'axios';

const apiKey = '4848e789a94a4cafaa7d0f72c64b3f84';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/';
const locationUrl = 'http://api.openweathermap.org/geo/1.0/';

export const getWeatherByCity = async (city) => {
    try {
        const response = axios.get(`${weatherUrl}weather?q=${city}&appid=${apiKey}&units=metric`);
        return response;
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        throw error;
    }
};

export const getForecastByCity = async (city) => {
    try {
        const locationResponse = await getLocationByCity(city);
        const locationData = locationResponse.data[0];
        if (!locationData) {
            throw new Error('City not found');
        }
        const { lat, lon } = locationData;
        const response = axios.get(`${weatherUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        return response;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
};

export const getLocationByCity = (city) => {
    return axios.get(`${locationUrl}direct?q=${city}&limit=1&appid=${apiKey}`)
}
