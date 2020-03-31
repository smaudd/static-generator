const fs = require('fs').promises
const path = require('path')
const {
    convertToSlug,
    writeStream,
    readStream,
    deleteFolderRecursive
  } = require('./source/lib/helpers')

const location = path.resolve(`${process.cwd()}/content/posts`)

async function generate() {
    for (let i = 0; i < 1000000; i++) {
        const slug = Math.random().toString(36).replace(/[^a-z]+/g, '')
        const message = `---\n title: ${slug} \n---
        `

        await fs.mkdir(`${location}/${slug}`)
        await writeStream(`${location}/${slug}/${slug}.md`, message)
        console.log(`Created ${i}`)
    }

}

generate()
