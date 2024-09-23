# GalaxyWeather

A weather application built with Vue 3 and Vite that allows you to check the current weather and forecast for any city.


## Requirements

- [Node.js](https://nodejs.org/) (Ensure you have the latest LTS version)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/fernandomacia/GalaxyWeather.git
cd GalaxyWeather
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

To securely manage sensitive information such as your API key, follow these steps:

1. **Create a `.env` File**: In the root directory of your project, create a file named `.env`.

2. **Add Your API Key**: Add the following line to your `.env` file, replacing `'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'` with your actual API key from [OpenWeatherMap](https://openweathermap.org):

```sh
VITE_WEATHER_API_KEY='XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```


### 4. Start the Development Server

```sh
npm run dev
```

### 5. Build for Production

```sh
npm run build
```


## Notes

- The `.env` file should never be committed to version control. Ensure it's included in your `.gitignore`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License

MIT Licensel

Copyright (c) 2024 Fernando Maciá López

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


