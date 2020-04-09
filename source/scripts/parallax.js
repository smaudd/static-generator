function Parallax() {
  const targets = document.querySelectorAll('[data-parallax]')
  console.log(window.innerHeight)
  function handleScroll() {
    const scrolled = window.pageYOffset
    const rate = scrolled * 0.05
    console.log(rate, window.pageYOffset)
    targets.forEach(function(target) {
      const { top, bottom } = target.getBoundingClientRect()
      
      const r = map(rate, 0, window.innerHeight * 0.1, 0, 50)
      target.style.transform = `translate3d(0, ${r}px, 0) scale(1.5)`
    })
  }
  targets.forEach(function(target) {
    target.style.transform = 'scale(1.5)'
  })
  window.addEventListener('scroll', handleScroll)
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}

export default Parallax
