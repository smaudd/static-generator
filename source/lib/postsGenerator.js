const path = require('path')
const fs = require('fs').promises
const yamlFront = require('yaml-front-matter')
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

const postsFolder = path.resolve(`${process.cwd()}/content/posts`)
const publicPosts = path.resolve(`${process.cwd()}/public/posts`)

// Checks if posts folder exists

async function postsGenerator() {
  try {
    await fs.access(publicPosts)
    deleteFolderRecursive(`${process.cwd()}/public/posts`)
    await fs.mkdir(publicPosts)
    buildContent()
  } catch (err) {
    await fs.mkdir(publicPosts)
    buildContent()
  }
}

async function buildContent() {
  console.log('\x1b[46m', '[STARTING BUILD]')
  try {
    const posts = await fs.readdir(postsFolder)
    await Promise.all(
      posts.map(async post => {
        // Get post markdown
        const markdown = await readStream(
          `${process.cwd()}/content/posts/${post}/post.md`
        )

        // Parse markdown to JSON
        const data = yamlFront.loadFront(markdown)

        // Parse markdown to HTML
        data.post = md.render(data.__content)

        // Render HTML with template
        const html = await renderFile(
          `${process.cwd()}/source/templates/index.ejs`,
          data
        )

        // Parse slug
        const slug = convertToSlug(data.title)

        // Create post folder
        const postPublicFolder = path.resolve(
          `${process.cwd()}/public/posts/${slug}/`
        )
        await fs.mkdir(postPublicFolder)

        // Notify
        console.log('\x1b[46m', '[BUILT]:', '\x1b[0m', slug)

        // Write file
        return writeStream(
          `${process.cwd()}/public/posts/${slug}/index.html`,
          html
        )
      })
    )
    console.log('\x1b[46m', '[SUCCESSFULLY BUILT]:', '\x1b[0m', `${posts.length} posts`)
  } catch (err) {
    throw new Error('Error building contents', err)
  }
}

module.exports = postsGenerator
