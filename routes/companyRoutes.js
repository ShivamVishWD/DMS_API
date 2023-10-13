const router = require('express').Router()
const jwtToken = require('../middlewares/JWT')
const companyController = require('../controllers/companyController')

router.post('/insert', companyController.insert)

router.post('/auth', jwtToken.verify, companyController.auth)

router.get('/fetch', jwtToken.verify, companyController.get)

router.put('/edit', jwtToken.verify, companyController.update)

router.delete('/delete', jwtToken.verify, companyController.delete)

module.exports = router