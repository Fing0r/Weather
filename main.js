import {
  WEATHER_UI
} from "./view.js";

WEATHER_UI.TAB_BTNS.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    removeActiveClass(WEATHER_UI.TAB_BTNS, WEATHER_UI.ACTIVE_CLASS)
    removeActiveClass(WEATHER_UI.TAB_INFO, WEATHER_UI.ACTIVE_CLASS)
    changeTab(e, WEATHER_UI.ACTIVE_CLASS)
  })
});

WEATHER_UI.SEARCH_INPUT.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = document.querySelector('.search__input').value;

  fetch(getUrl(cityName))
    .then(response => response.json())
    .then(json => {
      document.querySelector('.now__temp').textContent = `${Math.round(json.main.temp - 273.15)}°`
      document.querySelector('.now__city').textContent = json.name
      document.querySelector('.now__img').src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`
    }) 
})

function getUrl(city) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  return `${serverUrl}?q=${city}&appid=${apiKey}`;
}

function removeActiveClass(elems, activeClass) {
  elems.forEach(elem => elem.classList.remove(activeClass));
}

function changeTab(e, activeClass) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  e.currentTarget.classList.add(activeClass)
  isInfoTargetTab.classList.add(activeClass)
}
