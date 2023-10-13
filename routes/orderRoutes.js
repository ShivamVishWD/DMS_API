const router = require('express').Router()
const orderController = require('../controllers/orderController')

router.post('/create', orderController.insert)

router.get('/fetch')

router.patch('/update')

router.delete('/delete')

module.exports = router