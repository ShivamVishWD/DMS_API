const router = require('express').Router()
const orderController = require('../controllers/orderController')

router.post('/create', orderController.insert)

router.get('/fetch', orderController.get)

router.patch('/update', orderController.update)

router.delete('/delete', orderController.delete)

module.exports = router