import '../styles/main.css'

async function main() {
  const { default: _ } = await import(/* webpackChunkName: "nav" */ './nav')
}

main()
