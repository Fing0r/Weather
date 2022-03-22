import { DETAILS, NOW, FORECAST, CONFIG, FAVORITES, UI_ELEMENTS} from "./const.js";
import {showWeather, removeCityFromList, createCitiesItem, showCurrentWeather, showForecast} from "./view.js";

// storage.saveFavoriteCities(favoriteCities)
// const favoriteCities = storage.getFavoriteCities();
// const currentCity = storage.getCurrentCity();

export function updateFavoriteCities(cities) {
  localStorage.setItem('city', cities)
}

export function renderFavoriteCities() {
  if (!localStorage.city) return;
  FAVORITES.CITIES = localStorage.city.split(',')
  const favoriteItems = FAVORITES.CITIES.map(city => createCitiesItem(city))
  FAVORITES.LIST.append(...favoriteItems)
}

export function getFavoriteCityWeather() {
  if (!localStorage.currentCity) return;

  showCurrentWeather(localStorage.currentCity)
  showForecast(localStorage.currentCity)
}