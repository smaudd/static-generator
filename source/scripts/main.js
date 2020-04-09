import '../styles/main.css'

async function main() {
  const { default: Nav } = await import(/* webpackChunkName: "nav" */ './nav')
  const { default: Hax } = await import(/* webpackChunkName: "hax" */ './hax')
  Hax()
}

main()
