const router = require('express').Router()
const jwtToken = require('../middlewares/JWT')

router.use('/company', require('./companyRoutes'))

router.use('/dealer', require('./dealerRoutes'))

router.use('/product', jwtToken.verify, require('./productRoutes'))

router.use('/order', jwtToken.verify, require('./orderRoutes'))

router.get('*', (req, res)=>{
    return res.status(400).json({status: 400, message: 'No API Fond'});
})

module.exports = router