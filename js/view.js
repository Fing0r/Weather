import { DETAILS, NOW, FORECAST, CONFIG, FAVORITES, UI_ELEMENTS} from "./const.js";
import {addEvent, removeEvent, getDate, getTime, loadJson, getUrl } from "./mini-function.js";

export function showWeather(e) {
  e.preventDefault();
  const cityName = e.currentTarget.textContent.trim() || UI_ELEMENTS.SEARCH_INPUT.value.trim();

  showCurrentWeather(cityName)
  showForecast(cityName)

  if (UI_ELEMENTS.SEARCH_INPUT.value.trim()) {
    UI_ELEMENTS.SEARCH_INPUT.value = ''
  }
}

export function showCurrentWeather(cityName) {
  loadJson(getUrl(cityName, CONFIG.WEATHER))
    .then(city => {
      stateFavoriteButton(city.name);
      showNowTab(city);
      showDetailsTab(city);
    })
    .catch(console.log)
}

export function showForecast(city) {
  loadJson(getUrl(city, CONFIG.FORECAST))
    .then(getForecastItems)
    .then(forecastItems => {
      FORECAST.CITY.textContent = city;
      FORECAST.LIST.replaceChildren();
      FORECAST.LIST.append(...forecastItems);
    })
    .catch(console.log)
}

export function showDetailsTab(city) {
  DETAILS.CITY.textContent = city.name;
  DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(city.main.temp)}°`;
  DETAILS.FEELS.textContent = `Feels like: ${Math.round(city.main.feels_like)}°`;
  DETAILS.WEATHER.textContent = `Weather: ${city.weather[0].main}`;
  DETAILS.SUNRISE.textContent = `Sunrise: ${getTime(city.sys.sunrise)}`;
  DETAILS.SUNSET.textContent = `Sunset: ${getTime(city.sys.sunset)}`;
}

export function showNowTab(city) {
  NOW.TEMP.textContent = `${Math.round(city.main.temp)}°`;
  NOW.CITY.textContent = city.name;
  NOW.IMG.src = `${CONFIG.IMG}${city.weather[0].icon}@4x.png`
}

export const isCityInList = (cityName) => FAVORITES.CITIES.some(item => item === cityName);

export function stateFavoriteButton(cityName) {
  if (isCityInList(cityName)) {
    FAVORITES.ADD.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
    addEvent(FAVORITES.ADD, removeFavoriteCity)
    removeEvent(FAVORITES.ADD, addFavoriteCity)
  } else {
    FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
    addEvent(FAVORITES.ADD, addFavoriteCity)
    removeEvent(FAVORITES.ADD, removeFavoriteCity)
  }
}

export function addFavoriteCity() {
  FAVORITES.LIST.append(createCitiesItem());
  FAVORITES.CITIES.push(NOW.CITY.textContent);

  FAVORITES.ADD.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
  addEvent(FAVORITES.ADD, removeFavoriteCity)
  removeEvent(FAVORITES.ADD, addFavoriteCity)
}

export function removeFavoriteCity() {
  FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
  addEvent(FAVORITES.ADD, addFavoriteCity)

  for (const city of FAVORITES.LIST.children) {
    const name = city.querySelector('.cities__name');
    const isValid = NOW.CITY.textContent.includes(name.textContent);

    if (isValid) {
      city.remove();
      const indexItem = FAVORITES.CITIES.findIndex(item => item === name.textContent)
      FAVORITES.CITIES.splice(indexItem, 1);
      return
    }
  }
}

export function deleteFavoriteCity(e) {
  e.currentTarget.closest('.cities__item').remove()
  const cityNameTarget = e.currentTarget.closest('.cities__item').querySelector('.cities__name')

  if (cityNameTarget.textContent === NOW.CITY.textContent) {
    FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS)
    addEvent(FAVORITES.ADD, addFavoriteCity)
  }

  const cityName = e.currentTarget.closest('.cities__item').querySelector('.cities__name')
  const indexItem = FAVORITES.CITIES.findIndex(item => item === cityName.textContent)
  FAVORITES.CITIES.splice(indexItem, 1)
}

export function createCitiesItem() {
  const cityItem = document.createElement('li');
  cityItem.classList = 'cities__item';
  cityItem.insertAdjacentHTML("afterbegin", `
  <button class="cities__name" type="button">${NOW.CITY.textContent}</button>
  <button class="cities__close" type="button">X</button>`)

  const cityItemName = cityItem.querySelector('.cities__name')
  const cityItemClose = cityItem.querySelector('.cities__close')

  addEvent(cityItemName, showWeather)
  addEvent(cityItemClose, deleteFavoriteCity)

  return cityItem;
}

export function createForecastItem(item) {
  const forecastItem = FORECAST.ITEM.content.firstElementChild.cloneNode(true)
  forecastItem.querySelector('.forecast__date').textContent = getDate(item.dt);
  forecastItem.querySelector('.forecast__time').textContent = getTime(item.dt);
  forecastItem.querySelector('.forecast__temp').textContent = `Temperature: ${Math.round(item.main.temp)}°`;
  forecastItem.querySelector('.forecast__feels').textContent = `Feels like: ${item.main.feels_like}°`;
  forecastItem.querySelector('.forecast__precipitation').textContent = item.weather[0].main;
  forecastItem.querySelector('.forecast__img').src = `${CONFIG.IMG}${item.weather[0].icon}@4x.png`;

  return forecastItem;
}

export function getForecastItems(json) {
  return json.list.map(item => createForecastItem(item))
}