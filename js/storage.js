import {FAVORITES, NOW} from "./const.js";
import {showCurrentWeather, showForecast} from "./view.js";
import {FavoriteCity} from "./favoriteCity.js";

export function updateFavoriteCities(citiesArr) {
  const citiesJson = JSON.stringify([...citiesArr])
  localStorage.setItem('city', citiesJson)
}

export function renderFavoriteCities() {
  if (!localStorage.city) return;

  const favoriteCities = JSON.parse(localStorage.city)
  FAVORITES.CITIES = new Set(favoriteCities)

  const favoriteItems = [...FAVORITES.CITIES].map(item => new FavoriteCity(item).createCitiesItem())
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