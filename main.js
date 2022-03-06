import {
  WEATHER_UI
} from "/view.js";

WEATHER_UI.TAB_BTNS.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    removeActiveClass(WEATHER_UI.TAB_BTNS, WEATHER_UI.ACTIVE_CLASS)
    removeActiveClass(WEATHER_UI.TAB_INFO, WEATHER_UI.ACTIVE_CLASS)
    changeTab(e, WEATHER_UI.ACTIVE_CLASS)
  })
});


function removeActiveClass(elems, activeClass) {
  elems.forEach(elem => elem.classList.remove(activeClass));
}

function changeTab(e, activeClass) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  e.currentTarget.classList.add(activeClass)
  isInfoTargetTab.classList.add(activeClass)
}