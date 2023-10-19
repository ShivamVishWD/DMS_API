const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')
const path = require('path')
require('./configs/mongooseConfig');
const orderController = require('./controllers/orderController')
const Emitter = require('events');

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,POST')
        return res.status(200).json({})
    }
    next()
})

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
const eventEmitter = new Emitter();
app.use(express.json())
app.set('eventEmitter', eventEmitter)
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.json({status: 200, message: 'DMS API is Running'})
})

app.use('/api', require('./routes/routes'));

const APP_PORT = process.env.PORT || 3000

eventEmitter.on('start', (data)=>{
    console.log('index emit : ',data)
    orderController.myfun(data)
})
app.listen(APP_PORT, ()=>{
    console.log(`Server started at => ${APP_PORT}`)
})