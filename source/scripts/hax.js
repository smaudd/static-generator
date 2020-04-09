function Hax() {
  const options = {
    rootMargin: '0px',
    threshold: 0
  }
  const callback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in 0.5s forwards'
        observer.unobserve(entry.target)
      }
    })
  }

  var observer = new IntersectionObserver(callback, options)
  const haxs = document.querySelectorAll('[data-hax]')
  haxs.forEach(hax => observer.observe(hax))
  // observer.observe(haxs)
}

export default Hax