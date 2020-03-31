const postsGenerator = require('./lib/postsGenerator')
const indexGenerator = require('./lib/indexGenerator')

const build = async () => {
  const indexData = await postsGenerator()
  await indexGenerator(indexData)
}

build()
