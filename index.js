const express = require('express')
const app = express()
require('dotenv').config()
require('./configs/mongooseConfig');

app.get('/', (req, res) =>{
    res.json({status: 200, message: 'DMS API is Running'});
})

app.listen(3333, ()=>{
    console.log(`Server started at => 3333`);
})