const express = require('express')

const createMockRESTAPI = model => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    res.send(await model.list())
  })
  router.post('/', async (req, res) => {
    res.send(await model.create(req.body))
  })
  router.get('/:id', async (req, res) => {
    const record = await model.get(req.params.id)
    if (!record) {
      return res.status(404).send()
    }
    res.send(record)
  })
  router.patch('/:id', async (req, res) => {
    res.send(await model.update(req.params.id, req.body))
  })
  router.put('/:id', async (req, res) => {
    res.send(await model.replace(req.params.id, req.body))
  })
  router.delete('/:id', async (req, res) => {
    res.send(await model.delete(req.params.id))
  })
  return router
}

module.exports = createMockRESTAPI
