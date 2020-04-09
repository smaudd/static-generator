const burger = document.querySelector('.nav-burger')
const burgerTop = document.querySelector(`span[section='top']`)
const burgerCenter = document.querySelector(`span[section='center']`)
const burgerBottom = document.querySelector(`span[section='bottom']`)
const navList = document.querySelector('.nav-list')

let open = false

function handleNav() {
  if (open) {
    navList.style.animation = 'nav-list-out 1s forwards'
    burgerTop.style.animation = 'burger-section-top-out 1s forwards'
    burgerCenter.style.animation = 'burger-section-center-out 1s forwards'
    burgerBottom.style.animation = 'burger-section-bottom-out 1s forwards'
    open = !open
    return
  }
  navList.style.animation = 'nav-list-in 1s forwards'
  burgerTop.style.animation = 'burger-section-top-in 1s forwards'
  burgerCenter.style.animation = 'burger-section-center-in 1s forwards'
  burgerBottom.style.animation = 'burger-section-bottom-in 1s forwards'
  open = !open
}

burger.addEventListener('click', handleNav)
