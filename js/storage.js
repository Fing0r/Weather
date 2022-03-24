import {FAVORITES, NOW} from "./const.js";
import {createCitiesItem, showCurrentWeather, showForecast} from "./view.js";

export function updateFavoriteCities(citiesArr) {
  const citiesJson = JSON.stringify([...citiesArr])
  localStorage.setItem('city', citiesJson)
}

export function renderFavoriteCities() {
  if (!localStorage.city) return;

  const favoriteCities = JSON.parse(localStorage.city)
  favoriteCities.forEach(city => FAVORITES.CITIES.add(city));

  const favoriteItems = [...FAVORITES.CITIES].map(city => createCitiesItem(city))
  FAVORITES.LIST.append(...favoriteItems)
}

export function getCurrentCity(e) {
  const currentCity = e.currentTarget.textContent.trim() || NOW.CITY.textContent;
  localStorage.setItem('currentCity', currentCity)
}

export function getFavoriteCityWeather() {
  if (!localStorage.currentCity) return;

  showCurrentWeather(localStorage.currentCity)
  showForecast(localStorage.currentCity)
}