export const saveCity = (city) => {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem('cities', JSON.stringify(cities));
    }
};

export const removeCity = (city) => {
    let cities = getCities();
    cities = cities.filter(c => c !== city);
    localStorage.setItem('cities', JSON.stringify(cities));
};

export const getCities = () => {
    return JSON.parse(localStorage.getItem('cities')) || [];
};
  