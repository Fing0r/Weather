import {
  UI_ELEMENTS,
  DETAILS,
  NOW,
  FORECAST,
  CONFIG,
  FAVORITES
} from "./view.js";

UI_ELEMENTS.TAB_BTNS.forEach(tabBtn => tabBtn.addEventListener('click', changeTab));
FAVORITES.NAME.forEach(city => city.addEventListener('click', showWeather));
FAVORITES.DEL.forEach(close => close.addEventListener('click', deleteFavoriteCity));
UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', showWeather)


function loadJson(url) {
  return fetch(url).then(response => response.json())
}

function getUrl(city, type) {
  return `${CONFIG.API}${type}?q=${city}&appid=${CONFIG.KEY}&cnt=${CONFIG.NUMBER_FORECASTS}&units=metric`;
}

function showWeather(e) {
  e.preventDefault();
  const cityName = e.currentTarget.textContent.trim() || UI_ELEMENTS.SEARCH_INPUT.value.trim();

  showNowTab(cityName)
  showForecast(cityName)
  if (UI_ELEMENTS.SEARCH_INPUT.value.trim()) {
    UI_ELEMENTS.SEARCH_INPUT.value = ''
  }
}

function showNowTab(city) {
  loadJson(getUrl(city, CONFIG.WEATHER))
    .then(showTabInfo)
    .catch(console.log)
}

function showForecast(city) {
  loadJson(getUrl(city, CONFIG.FORECAST))
    .then(arr)
    .then(result => {
      FORECAST.LIST.replaceChildren();
      result.forEach(el => FORECAST.LIST.append(el));
    })
}

function checkFavoriteCity(cityName) {
  const isCityInList = FAVORITES.CITIES.some(item => item === cityName);

  if (isCityInList) {
    FAVORITES.ADD.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
    FAVORITES.ADD.addEventListener('click', removeFavoriteCity);
    FAVORITES.ADD.removeEventListener('click', addFavoriteCity);
  } else {
    FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
    FAVORITES.ADD.removeEventListener('click', removeFavoriteCity);
    FAVORITES.ADD.addEventListener('click', addFavoriteCity);
  }
}

function showTabInfo(city) {
  checkFavoriteCity(city.name);
  NOW.TEMP.textContent = `${Math.round(city.main.temp)}°`;
  NOW.CITY.textContent = city.name;
  NOW.IMG.src = `${CONFIG.IMG}${city.weather[0].icon}@4x.png`

  DETAILS.CITY.textContent = city.name;
  DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(city.main.temp)}°`;
  DETAILS.FEELS.textContent = `Feels like: ${Math.round(city.main.feels_like)}°`;
  DETAILS.WEATHER.textContent = `Weather: ${city.weather[0].main}`;
  DETAILS.SUNRISE.textContent = `Sunrise: ${getTime(city.sys.sunrise)}`;
  DETAILS.SUNSET.textContent = `Sunset: ${getTime(city.sys.sunset)}`;

  FORECAST.CITY.textContent = city.name;
}


function getDate(param) {
  return new Date((param) * 1000).toLocaleDateString('en-GB', {
    month: 'short',
    day: '2-digit',
  })
}

function getTime(param, timezone = 0) {
  return new Date((param - timezone) * 1000).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric'
  })
}

function addFavoriteCity() {
  FAVORITES.LIST.append(createCityItem());
  FAVORITES.ADD.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
  FAVORITES.ADD.removeEventListener('click', addFavoriteCity);
  FAVORITES.ADD.addEventListener('click', removeFavoriteCity);
  FAVORITES.CITIES.push(NOW.CITY.textContent);
}

function removeFavoriteCity() {
  FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
  FAVORITES.ADD.addEventListener('click', addFavoriteCity);

  for (const iterator of FAVORITES.LIST.children) {
    const name = iterator.querySelector('.cities__name');
    const isValis = NOW.CITY.textContent.includes(name.textContent);
    const indexItem = FAVORITES.CITIES.findIndex(item => item === name.textContent)

    if (isValis) {
      iterator.remove();
      FAVORITES.CITIES.splice(indexItem, 1);
      return
    }
  }
}

function deleteFavoriteCity(e) {
  e.currentTarget.closest('.cities__item').remove()
  FAVORITES.ADD.classList.remove(UI_ELEMENTS.ACTIVE_CLASS)
  FAVORITES.ADD.addEventListener('click', addFavoriteCity)

  const cityName = e.currentTarget.closest('.cities__item').querySelector('.cities__name')
  const indexItem = FAVORITES.CITIES.findIndex(item => item === cityName.textContent)
  FAVORITES.NAME.splice(indexItem, 1)
}

function addEvent(button, createFunction) {
  button.addEventListener('click', createFunction)
}

function createCityItem() {
  const cityItem = document.createElement('li');
  cityItem.classList = 'cities__item';
  cityItem.insertAdjacentHTML("afterbegin", `
  <button class="cities__name" type="button">${NOW.CITY.textContent}</button>
  <button class="cities__close" type="button">X</button>`)

  const cityItemName = cityItem.querySelector('.cities__name')
  const cityItemClose = cityItem.querySelector('.cities__close')

  addEvent(cityItemName, showWeather)
  addEvent(cityItemClose, deleteFavoriteCity)

  return cityItem;
}

function removeActiveClass(elems) {
  elems.forEach(elem => elem.classList.remove(UI_ELEMENTS.ACTIVE_CLASS));
}

function changeTab(e) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  removeActiveClass(UI_ELEMENTS.TAB_BTNS)
  removeActiveClass(UI_ELEMENTS.TAB_INFO)

  e.currentTarget.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
  isInfoTargetTab.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
}

function createForecastItem(json) {
  const forecastItem = FORECAST.ITEM.content.firstElementChild.cloneNode(true)
  forecastItem.querySelector('.forecast__date').textContent = json.date;
  forecastItem.querySelector('.forecast__time').textContent = json.time;
  forecastItem.querySelector('.forecast__temp').textContent = `Temperature: ${json.temp}°`;
  forecastItem.querySelector('.forecast__feels').textContent = `Feels like: ${json.feels}°`;
  forecastItem.querySelector('.forecast__precipitation').textContent = json.weather;
  forecastItem.querySelector('.forecast__img').src = `${CONFIG.IMG}${json.icon}@4x.png`;

  return forecastItem;
}

function arr(json) {
  return getForecastInfo(json).map(item => createForecastItem(item))
}

function getForecastInfo(json) {
  return json.list.map(item => ({
    date: getDate(item.dt),
    time: getTime(item.dt),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
    weather: item.weather[0].main,
    icon: item.weather[0].icon,
  }))
}