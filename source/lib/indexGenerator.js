const path = require('path')
const fs = require('fs').promises
const YAML = require('yaml')
const md = require('markdown-it')()
const ejs = require('ejs')
const {
  convertToSlug,
  writeStream,
  readStream,
  deleteFolderRecursive
} = require('./helpers')

function renderFile(templatePath, data) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, {}, function(err, str) {
      if (err) reject(err)
      resolve(str)
    })
  })
}

const metaPath = path.resolve(`${process.cwd()}/content/meta.yml`)

// Checks if posts folder exists

async function indexGenerator(posts) {
  return buildContent(posts)
}

async function buildContent(posts) {
  console.log('\x1b[46m', '[PROCESSING INDEX]', '\x1b[0m')
  try {
    // Get meta file
    const meta = await readStream(metaPath)

    // Parse YAML to JSON
    const data = YAML.parse(meta)

    // Append posts to data
    data.posts = posts
    // console.log(data)
    // // Render HTML with template
    const html = await renderFile(
      `${process.cwd()}/source/templates/index.ejs`,
      data
    )

    // Write file
    await writeStream(`${process.cwd()}/public/index.html`, html)
    console.log('\x1b[46m', '[SUCCESSFULLY BUILT INDEX]', '\x1b[0m')
  } catch (err) {
    throw new Error('Error building index', err)
  }
}

module.exports = indexGenerator
