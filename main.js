const tabBtns = document.querySelectorAll('[data-btn]');
const tabInfo = document.querySelectorAll('[data-item]');

tabBtns.forEach(tabBtn => {
  tabBtn.addEventListener('click', function (e) {
    const tabBtnDataAttr = e.currentTarget.dataset.btn
    const tabInfoTarget = document.querySelector(`[data-item='${tabBtnDataAttr}']`)

    tabBtns.forEach(tabBtn => tabBtn.classList.remove('info__btn--active'));
    tabInfo.forEach(tabInfo => tabInfo.classList.remove('info__box--active'));

    e.currentTarget.classList.add('info__btn--active')
    tabInfoTarget.classList.add('info__box--active')
  })
});