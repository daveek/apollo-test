const express = require('express')
const app = express()

app.use(require('morgan')('dev'))
app.use(require('body-parser').json())
app.use(require('cors')())

app.use(require('./api'))

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  console.log('got error', err)
  res.status(err.status || 500)
  res.json({ error: err.message })
})

app.start = port =>
  new Promise(resolve => {
    app.listen(port, resolve)
  })

module.exports = app
