import {CONFIG} from "./const.js";

export function addEvent(button, createFunction) {
  button.addEventListener('click', createFunction)
}

export function removeEvent(button, createFunction) {
  button.removeEventListener('click', createFunction)
}

export function getDate(param) {
  return new Date((param) * 1000).toLocaleDateString('en-GB', {
    month: 'short',
    day: '2-digit',
  })
}

export async function getJson(cityName, type) {
  const url = getUrl(cityName, type);
  const response = await fetch(url);

  return response.json();
}

export function getTime(param) {
  return new Date((param) * 1000).toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric'
  })
}

export function loadJson(url) {
  return fetch(url).then(response => response.json())
}

export function getUrl(city, type) {
  return `${CONFIG.API}${type}?q=${city}&appid=${CONFIG.KEY}&cnt=${CONFIG.NUMBER_FORECASTS}&units=metric`;
}