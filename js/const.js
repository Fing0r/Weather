export const UI_ELEMENTS = {
    TAB_BTNS: document.querySelectorAll('[data-btn]'),
    TAB_INFO: document.querySelectorAll('[data-item]'),
    SEARCH_FORM: document.querySelector('.search'),
    SEARCH_INPUT: document.querySelector('.search__input'),
    ACTIVE_CLASS: 'active',
}

export const CONFIG = {
    KEY: '410226e920d4ba9da4b071dd89dac12f',
    API: 'http://api.openweathermap.org/data/2.5/',
    IMG: 'http://openweathermap.org/img/wn/',
    WEATHER: 'weather',
    FORECAST: 'forecast',
    NUMBER_FORECASTS: 6,
}

export const FAVORITES = {
    LIST: document.querySelector('.cities__list'),
    ITEM: document.getElementsByClassName('cities__item'),
    TEMPLATE_ITEM: document.querySelector('#cities-item'),
    NAME: document.querySelectorAll('.cities__name'),
    DEL: document.querySelectorAll('.cities__close'),
    ADD: document.querySelector('.now__heart'),
    CITIES: new Set(),
}
export const NOW = {
    TEMP: document.querySelector('.now__temp'),
    CITY: document.querySelector('.now__city'),
    IMG: document.querySelector('.now__img'),
}

export const DETAILS = {
    CITY: document.querySelector('.details__city'),
    INFO: document.querySelector('.details__info'),
    TEMPERATURE: document.querySelector('.details__temperature'),
    FEELS: document.querySelector('.details__feels'),
    WEATHER: document.querySelector('.details__weather'),
    SUNRISE: document.querySelector('.details__sunrise'),
    SUNSET: document.querySelector('.details__sunset'),
}

export const FORECAST = {
    CITY: document.querySelector('.forecast__city'),
    LIST: document.querySelector('.forecast__list'),
    TEMPLATE_ITEM: document.querySelector('#forecast-item'),
}
