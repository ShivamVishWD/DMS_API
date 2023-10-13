const router = require('express').Router()
const jwtToken = require('../middlewares/JWT')
const dealerController = require('../controllers/dealerController')

router.post('/insert', jwtToken.verify, dealerController.insert);

router.post('/auth', dealerController.auth);

router.get('/fetch', jwtToken.verify, dealerController.get);

module.exports = router