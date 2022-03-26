import {UI_ELEMENTS} from "./const.js";
import {showWeather} from "./view.js";
import {changeTab} from "./tabs.js";
import * as storage from "./storage.js";


UI_ELEMENTS.TAB_BTNS.forEach(tabBtn => tabBtn.addEventListener('click', changeTab));
UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', showWeather)
storage.renderFavoriteCities()
storage.getFavoriteCityWeather()