const router = require('express').Router()
const productController = require('../controllers/productController')

router.post('/insert', productController.insert)

router.get('/fetch', productController.get)

router.patch('/update', productController.update)

router.delete('/delete', productController.delete)

module.exports = router