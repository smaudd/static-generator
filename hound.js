const hound = require('hound')
const { exec } = require('child_process')
const path = require('path')

const content = path.resolve(__dirname + '/content')
const source = path.resolve(__dirname + '/source')

console.log('Launching Hound')
// Create a directory tree watcher.
const watchSource = hound.watch(source)
const watchContent = hound.watch(content)

// Add callbacks for file and directory events.  The change event only applies
// to files.
watchSource.on('create', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})
watchSource.on('change', () => {
  exec('npm run build', (err, stdout, stderr) => {
    console.log(stdout)
    console.log('Compiling...')
    // console.log(err, stdout, stderr)
  })
})
watchSource.on('delete', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})

// Add callbacks for file and directory events.  The change event only applies
// to files.
watchContent.on('create', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})
watchContent.on('change', () => {
  exec('npm run build', (err, stdout, stderr) => {
    console.log(stdout)
    console.log('Compiling...')
    // console.log(err, stdout, stderr)
  })
})
watchContent.on('delete', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})
