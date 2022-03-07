export const WEATHER_UI = {
  TAB_BTNS: document.querySelectorAll('[data-btn]'),
  TAB_INFO: document.querySelectorAll('[data-item]'),
  SEARCH_FORM: document.querySelector('.search'),
  SEARCH_INPUT: document.querySelector('.search__input'),
  NOW_TEMP: document.querySelector('.now__temp'),
  NOW_CITY: document.querySelector('.now__city'),
  NOW_IMG: document.querySelector('.now__img'),
  CITIES: document.querySelectorAll('.cities__item button'),
  ACTIVE_CLASS: 'active',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  API_URL: 'https://api.openweathermap.org/data/2.5/weather', 
}
