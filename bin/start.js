const cp = require('child_process')
const path = require('path')
const process = require('process')

const exec = command => {
  const child = cp.exec(command, { stdio: [0, 1, 2] })
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  return child
}

const startClient = () => {
  process.chdir(path.resolve(__dirname, '../client'))
  return exec('npm start')
}

const startServer = () => {
  process.chdir(path.resolve(__dirname, '../server'))
  return exec('npm start')
}
;(async function start() {
  await Promise.all([startClient(), startServer()])
})()
