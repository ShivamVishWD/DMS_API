const router = require('express').Router()
const serviceRequestController = require('../controllers/serviceRequestController')

router.post('/insert', serviceRequestController.insert)

router.get('/fetch', serviceRequestController.get)

router.patch('/update', serviceRequestController.update)

router.delete('/delete', serviceRequestController.delete)

module.exports = router