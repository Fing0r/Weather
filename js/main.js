import {UI_ELEMENTS, FAVORITES, NOW} from "./const.js";
import {showWeather, removeCityFromList, createCitiesItem, showCurrentWeather, showForecast} from "./view.js";
import {changeTab} from "./tabs.js";

UI_ELEMENTS.TAB_BTNS.forEach(tabBtn => tabBtn.addEventListener('click', changeTab));
FAVORITES.NAME.forEach(city => city.addEventListener('click', showWeather));
FAVORITES.DEL.forEach(close => close.addEventListener('click', removeCityFromList));
UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', showWeather)

document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.city) return;

  FAVORITES.CITIES = localStorage.city.split(',')
  
  const favoriteItems = FAVORITES.CITIES.map(city => createCitiesItem(city))
  FAVORITES.LIST.append(...favoriteItems)

  if (!localStorage.current) return;

  showCurrentWeather(localStorage.current)
  showForecast(localStorage.current)
})

