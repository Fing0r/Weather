import {FAVORITES, NOW} from "./const.js";
import {showWeather, addAndRemoveEvent, addFavoriteCity, removeFavoriteCity} from "./view.js";
import * as storage from "./storage.js";

export function FavoriteCity(cityName) {
  this.cityName = cityName;

  this.createCitiesItem = function () {
    this.cityItem = FAVORITES.TEMPLATE_ITEM.content.firstElementChild.cloneNode(true);

    this.cityItemClose = this.cityItem.querySelector('.cities__close');
    this.cityItemName = this.cityItem.querySelector('.cities__name');
    
    this.cityItemName.textContent = this.cityName;

    this.addEvent(this.cityItemName, showWeather);
    this.addEvent(this.cityItemName, storage.getCurrentCity);
    this.addEvent(this.cityItemClose, this.removeCityFromList.bind(this));

    return this.cityItem;
  }

  this.addEvent = function(button, createFunction) {
    button.addEventListener('click', createFunction)
  }

  this.removeCityFromList = function() {
    FAVORITES.CITIES.delete(this.cityName);
    this.cityItemClose.closest('.cities__item').remove();
    storage.updateFavoriteCities(FAVORITES.CITIES);

    const isTargetInNowTab = this.cityName === NOW.CITY.textContent;
    if (!isTargetInNowTab) return;

    addAndRemoveEvent(addFavoriteCity, removeFavoriteCity)
    localStorage.removeItem('currentCity')
  }
}