function Parallax() {
  const defaultScale = 1.5
  const targets = document.querySelectorAll('[data-parallax]')
  function handleScroll() {
    const scrolled = window.pageYOffset
    const rate = scrolled * 0.05
    targets.forEach(function(target) {
      const { top, bottom } = target.getBoundingClientRect()
      const r = map(rate, 0, window.innerHeight * 0.1, 0, 50)
      const scale = target.getAttribute('data-parallax')
      target.style.transform = `translate3d(0, ${r}px, 0) scale(${scale
        ? scale
        : defaultScale})`
    })
  }
  targets.forEach(function(target) {
    const scale = target.getAttribute('data-parallax')
    target.style.transform = `scale(${scale ? scale : defaultScale})`
  })
  window.addEventListener('scroll', handleScroll)
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
}

export default Parallax
