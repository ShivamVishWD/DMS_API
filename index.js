const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const session = require('express-session')
const path = require('path')
require('./configs/mongooseConfig');

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

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.json({status: 200, message: 'DMS API is Running'})
})

app.use('/api', require('./routes/routes'));

const APP_PORT = process.env.PORT || 3000

app.listen(APP_PORT, ()=>{
    console.log(`Server started at => ${APP_PORT}`)
})