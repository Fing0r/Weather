import {UI_ELEMENTS, FAVORITES} from "./const.js";
import {showWeather, deleteFavoriteCity} from "./view.js";
import {changeTab} from "./tabs.js";

UI_ELEMENTS.TAB_BTNS.forEach(tabBtn => tabBtn.addEventListener('click', changeTab));
FAVORITES.NAME.forEach(city => city.addEventListener('click', showWeather));
FAVORITES.DEL.forEach(close => close.addEventListener('click', deleteFavoriteCity));
UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', showWeather)