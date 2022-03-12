import {UI_ELEMENTS} from "./const.js";

export function changeTab(e) {
  const isDataAttrCurrentTargetBtn = e.currentTarget.dataset.btn
  const isInfoTargetTab = document.querySelector(`[data-item='${isDataAttrCurrentTargetBtn}']`)

  removeActiveClass(UI_ELEMENTS.TAB_BTNS)
  removeActiveClass(UI_ELEMENTS.TAB_INFO)

  e.currentTarget.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
  isInfoTargetTab.classList.add(UI_ELEMENTS.ACTIVE_CLASS)
}

function removeActiveClass(elements) {
  elements.forEach(element => element.classList.remove(UI_ELEMENTS.ACTIVE_CLASS));
}