var express = require('express')
var app = express()
var bodyparser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const port = 5000;

var cors = require('cors')
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.use("/api1",require('./Route/tets.route'))
app.use("/user",require('./Route/user.route'))

app.listen(port,()=>console.log(`App listening ${port}`))