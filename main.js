import {
  WEATHER_UI
} from "./view.js";

WEATHER_UI.TAB_BTNS.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    removeActiveClass(WEATHER_UI.TAB_BTNS)
    removeActiveClass(WEATHER_UI.TAB_INFO)
    changeTab(e)
  })
});

WEATHER_UI.SEARCH_FORM.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = WEATHER_UI.SEARCH_INPUT.value;

  loadJson(getUrl(cityName))
    .then(json => showNowTabInfo(json))
    .catch(err => console.log(err.message))
})

WEATHER_UI.CITIES.forEach(city => {
  city.addEventListener('click', function () {
    const cityName = city.textContent;

    loadJson(getUrl(cityName))
      .then(json => showNowTabInfo(json))
  })
});

function showNowTabInfo(params) {
  const getUrlImg = (img) => `https://openweathermap.org/img/wn/${img}.png`

  WEATHER_UI.NOW_TEMP.textContent = conversKelinsToCelsius(params.main.temp)
  WEATHER_UI.NOW_CITY.textContent = params.name
  WEATHER_UI.NOW_IMG.src = getUrlImg(params.weather[0].icon)
}

function conversKelinsToCelsius(temp) {
  return `${Math.round(temp - 273.15)}°`
}

function loadJson(url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }
    throw Error('Неверное название города')
  })
}

function getUrl(city) {
  return `${WEATHER_UI.API_URL}?q=${city}&appid=${WEATHER_UI.API_KEY}`;
}

function removeActiveClass(elems) {
  elems.forEach(elem => elem.classList.remove(WEATHER_UI.ACTIVE_CLASS));
}

function changeTab(e) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  e.currentTarget.classList.add(WEATHER_UI.ACTIVE_CLASS)
  isInfoTargetTab.classList.add(WEATHER_UI.ACTIVE_CLASS)
}
