const hound = require('hound')
const { exec } = require('child_process')
const path = require('path')

const source = path.resolve(__dirname + '/content')

console.log('Launching Hound')
// Create a directory tree watcher.
const watcher = hound.watch(source)

// Add callbacks for file and directory events.  The change event only applies
// to files.
watcher.on('create', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})
watcher.on('change', () => {
  exec('npm run build', (err, stdout, stderr) => {
    console.log(stdout)
    console.log('Compiling...')
    // console.log(err, stdout, stderr)
  })
})
watcher.on('delete', () => {
  exec('npm run build', (err, stdout, stderr) => {
    // console.log(err, stdout, stderr)
    console.log('Compiling...')
  })
})
