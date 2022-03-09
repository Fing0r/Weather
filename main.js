import {
  UI_ELEMENTS
} from "./view.js";

UI_ELEMENTS.TAB_BTNS.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    removeActiveClass(UI_ELEMENTS.TAB_BTNS)
    removeActiveClass(UI_ELEMENTS.TAB_INFO)
    changeTab(e)
  })
});

UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = UI_ELEMENTS.SEARCH_INPUT.value.trim();

  loadJson(getUrl(cityName))
    .then(showNowTabInfo)
    .catch(console.log)
  UI_ELEMENTS.SEARCH_INPUT.value = ''
})

UI_ELEMENTS.CITIES.forEach(city => {
  city.addEventListener('click', function () {
    createEventCityWeather(city)
  })
});

function createEventCityWeather(city) {
  const cityName = city.textContent;

  loadJson(getUrl(cityName))
    .then(showNowTabInfo)
}

// UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', addFavoriteCity);

function checkFavoriteCity(cityName) {
  const isCityInList = UI_ELEMENTS.FAVORITE_CITIES.some(item => item === cityName);

  if (isCityInList) {
    UI_ELEMENTS.FAVORITE_BTN.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
    UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', removeFavoriteCity);
    UI_ELEMENTS.FAVORITE_BTN.removeEventListener('click', addFavoriteCity);
  } else {
    UI_ELEMENTS.FAVORITE_BTN.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
    UI_ELEMENTS.FAVORITE_BTN.removeEventListener('click', removeFavoriteCity);
    UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', addFavoriteCity);
  }
}

function showNowTabInfo(params) {
  const getUrlImg = (img) => `https://openweathermap.org/img/wn/${img}.png`

  checkFavoriteCity(params.name);
  UI_ELEMENTS.NOW_TEMP.textContent = Math.round(params.main.temp);
  UI_ELEMENTS.NOW_CITY.textContent = params.name;
  UI_ELEMENTS.NOW_IMG.src = getUrlImg(params.weather[0].icon);
}

function addFavoriteCity() {
  UI_ELEMENTS.FAVORITE_LIST.append(createCityItemElement());
  UI_ELEMENTS.FAVORITE_BTN.classList.add(UI_ELEMENTS.ACTIVE_CLASS);
  UI_ELEMENTS.FAVORITE_BTN.removeEventListener('click', addFavoriteCity);
  UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', removeFavoriteCity);
  UI_ELEMENTS.FAVORITE_CITIES.push(UI_ELEMENTS.NOW_CITY.textContent);
}

function removeFavoriteCity() {
  UI_ELEMENTS.FAVORITE_BTN.classList.remove(UI_ELEMENTS.ACTIVE_CLASS);
  UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', addFavoriteCity);

  for (const iterator of UI_ELEMENTS.FAVORITE_LIST.children) {
    const name = iterator.querySelector('.cities__name');
    const isValis = UI_ELEMENTS.NOW_CITY.textContent.includes(name.textContent);
    const indexItem = UI_ELEMENTS.FAVORITE_CITIES.findIndex(item => item === name.textContent)

    if (isValis) {
      iterator.remove();
      UI_ELEMENTS.FAVORITE_CITIES.splice(indexItem, 1)
    }
  }
}

function createCityItemElement() {
  const cityItemElement = document.createElement('li');
  cityItemElement.classList = 'cities__item';

  const cityItemName = document.createElement('button')
  cityItemName.classList = 'cities__name';
  cityItemName.textContent = UI_ELEMENTS.NOW_CITY.textContent;
  cityItemName.type = 'button';

  const cityItemClose = document.createElement('button')
  cityItemClose.classList = 'cities__close';
  cityItemClose.textContent = 'X';
  cityItemClose.type = 'button';

  cityItemElement.append(cityItemName);
  cityItemElement.append(cityItemClose);

  addEvent(cityItemName, createEventCityWeather)
  addEvent(cityItemClose, createEventDeletFavoriteCity)

  return cityItemElement;
}

function addEvent(button, createFunction) {
  button.addEventListener('click', function () {
    createFunction(button)
  })
}

function createEventDeletFavoriteCity(cityClose) {
  cityClose.closest('.cities__item').remove()
  UI_ELEMENTS.FAVORITE_BTN.classList.remove(UI_ELEMENTS.ACTIVE_CLASS)
  UI_ELEMENTS.FAVORITE_BTN.addEventListener('click', addFavoriteCity)

  const indexItem = UI_ELEMENTS.FAVORITE_CITIES.findIndex(item => item === cityClose.closest('.cities__item').querySelector('.cities__name').textContent)
  UI_ELEMENTS.FAVORITE_CITIES.splice(indexItem, 1)
}

function loadJson(url) {
  return fetch(url).then(response => response.json())
}

function getUrl(city) {
  return `${UI_ELEMENTS.API_URL}?q=${city}&appid=${UI_ELEMENTS.API_KEY}&units=metric`;
}

function removeActiveClass(elems) {
  elems.forEach(elem => elem.classList.remove(UI_ELEMENTS.ACTIVE_CLASS));
}

function changeTab(e) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  e.currentTarget.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
  isInfoTargetTab.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
}
