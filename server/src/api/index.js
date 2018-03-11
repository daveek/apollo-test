const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/authors', require('./authors'))
router.use('/books', require('./books'))
router.use('/book-shelves', require('./book-shelves'))

module.exports = router
