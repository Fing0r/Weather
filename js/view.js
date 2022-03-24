import { DETAILS, NOW, FORECAST, CONFIG, FAVORITES, UI_ELEMENTS} from "./const.js";
import * as storage from "./storage.js";
import {addEvent, removeEvent, getDate, getTime, getJson } from "./mini-function.js";

export function showWeather(e) {
  e.preventDefault();
  const cityName = e.currentTarget.textContent.trim() || UI_ELEMENTS.SEARCH_INPUT.value.trim();

  showCurrentWeather(cityName)
  showForecast(cityName)

  if (!UI_ELEMENTS.SEARCH_INPUT.value.trim()) return;
  UI_ELEMENTS.SEARCH_INPUT.value = ''
}

export async function showCurrentWeather(cityName) {
  const currentWeatherJson = await getJson(cityName, CONFIG.WEATHER)

  showNowTab(currentWeatherJson);
  showDetailsTab(currentWeatherJson);
  stateFavoriteButton();
}

export async function showForecast(city) {
  const forecastJson = await getJson(city, CONFIG.FORECAST)
  const forecastItems = getForecastItems(forecastJson)
  const {city:{name: cityName}} = forecastJson

  FORECAST.CITY.textContent = cityName;
  FORECAST.LIST.replaceChildren();
  FORECAST.LIST.append(...forecastItems);
}

export function showDetailsTab({
  name: name,
  main: {
    temp: temperature,
    feels_like: feelsLike
  },
   weather: {
     [0]: {
       main: weather
     }
   },
   sys: {
     sunrise: sunrise,
     sunset: sunset
   }
}) {
  DETAILS.CITY.textContent = name;
  DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(temperature)}°`;
  DETAILS.FEELS.textContent = `Feels like: ${Math.round(feelsLike)}°`;
  DETAILS.WEATHER.textContent = `Weather: ${weather}`;
  DETAILS.SUNRISE.textContent = `Sunrise: ${getTime(sunrise)}`;
  DETAILS.SUNSET.textContent = `Sunset: ${getTime(sunset)}`;
}

export function showNowTab({
  name: cityName,
  main: {
    temp: temperature
  },
  weather:{
    [0]:{
      icon: icon
    }
  }
}) {
  NOW.TEMP.textContent = `${Math.round(temperature)}°`;
  NOW.CITY.textContent = cityName;
  NOW.IMG.src = `${CONFIG.IMG}${icon}@4x.png`
}

function stateFavoriteButton() {
  const isCityInList = FAVORITES.CITIES.has(NOW.CITY.textContent)

  if (isCityInList) {
    addAndRemoveEvent(removeFavoriteCity, addFavoriteCity, 'addClass')
  } else {
    addAndRemoveEvent(addFavoriteCity, removeFavoriteCity)
  }
}

function addAndRemoveEvent(addFunction, removeFunction, toggleCLass) {
  addEvent(FAVORITES.ADD, addFunction);
  removeEvent(FAVORITES.ADD, removeFunction);
  
  toggleCLass ? FAVORITES.ADD.classList.add(UI_ELEMENTS.ACTIVE_CLASS) : FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
}

function addFavoriteCity(e) {
  FAVORITES.LIST.append(createCitiesItem(NOW.CITY.textContent));
  FAVORITES.CITIES.add(NOW.CITY.textContent)

  storage.updateFavoriteCities(FAVORITES.CITIES)
  storage.getCurrentCity(e)
   
  addAndRemoveEvent(removeFavoriteCity, addFavoriteCity, 'addClass')
}

function removeFavoriteCity() {
  addAndRemoveEvent(addFavoriteCity, removeFavoriteCity)

  const isTragetInNowTab = [...FAVORITES.LIST.children].find(cityItem => cityItem.textContent.trim() === NOW.CITY.textContent)
  if (!isTragetInNowTab) return;

  isTragetInNowTab.remove();

  FAVORITES.CITIES.delete(NOW.CITY.textContent)

  storage.updateFavoriteCities(FAVORITES.CITIES)
  localStorage.removeItem('currentCity')
}

export function removeCityFromList(e) {
  const cityInTarget = e.currentTarget.closest('.cities__item')
  const nameCityInTarget = cityInTarget.textContent.trim()

  FAVORITES.CITIES.delete(nameCityInTarget);
  cityInTarget.remove();
  storage.updateFavoriteCities(FAVORITES.CITIES);

  const isTargetInNowTab = nameCityInTarget === NOW.CITY.textContent;

  if (!isTargetInNowTab) return;

  addAndRemoveEvent(addFavoriteCity, removeFavoriteCity)
  localStorage.removeItem('currentCity')
}

export function createCitiesItem(city) {
  const cityItem = FAVORITES.TEMPLATE_ITEM.content.firstElementChild.cloneNode(true);

  const cityItemClose = cityItem.querySelector('.cities__close');
  const cityItemName = cityItem.querySelector('.cities__name');
  cityItemName.textContent = city;

  addEvent(cityItemName, showWeather);
  addEvent(cityItemName, storage.getCurrentCity);
  addEvent(cityItemClose, removeCityFromList);

  return cityItem;
}

export function createForecastItem({
  dt:date,
  main: {
    temp,
    feels_like
  },
  weather: {
    [0]: {
      main,
      icon
    }
  }
}) {
  const forecastItem = FORECAST.TEMPLATE_ITEM.content.firstElementChild.cloneNode(true);
  forecastItem.querySelector('.forecast__date').textContent = getDate(date);
  forecastItem.querySelector('.forecast__time').textContent = getTime(date);
  forecastItem.querySelector('.forecast__temp').textContent = `Temperature: ${Math.round(temp)}°`;
  forecastItem.querySelector('.forecast__feels').textContent = `Feels like: ${Math.round(feels_like)}°`;
  forecastItem.querySelector('.forecast__precipitation').textContent = main;
  forecastItem.querySelector('.forecast__img').src = `${CONFIG.IMG}${icon}@4x.png`;

  return forecastItem;
}

export function getForecastItems({list: forecastList}) {
  return forecastList.map(item => createForecastItem(item))
}