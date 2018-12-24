const express = require('express')

const app = express()
const morgan = require('morgan')
const bodyPasser = require('body-parser')
var mongoose = require('mongoose')
// var MongoClient = require('mongodb').MongoClient

const productRouters = require('./api/routes/products')
const orderRouters = require('./api/routes/orders')

var uri = 'mongodb://' + process.env.MONGODB_ATLAS_USER + ':' + process.env.MONGODB_ATLAS_PW +
    '@node-js-mongoose-shard-00-00-554zu.mongodb.net:27017,' +
    'node-js-mongoose-shard-00-01-554zu.mongodb.net:27017,' +
    'node-js-mongoose-shard-00-02-554zu.mongodb.net:27017/' + process.env.MONGODB_ATLAS_DB_NAME +
    '?ssl=true&replicaSet=node-js-mongoose-shard-0&authSource=admin&retryWrites=true'


mongoose.connect(uri, {
    useNewUrlParser: true
}).then(
    () => {
        console.log('MONGOOSE CONNECT SUCESS')
    },
    err => {
        console.log('MONGOOSE CONNECT ERROR', err)
    }
)
/**
MongoClient.connect(uri, { useNewUrlParser: true })
    .then(
        () => {
            console.log('MONGOOSE CONNECT SUCESS')
        },
        err => {
            console.log('MONGOOSE CONNECT ERROR', err)
            console.log('>>>>>>>>>>>', process.env.MONGODB_ATLAS_PW)
        }
    )
*/
app.use(morgan('dev'))
app.use(bodyPasser.urlencoded({extended: false}))
app.use(bodyPasser.json())

// CORS
app.use('/test', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/test', (req, res, next) => {
    res.status(200).json({
        message: 'it works'
    })
})

app.use('/products', productRouters)
app.use('/orders', orderRouters)

// Handle err
app.use((req, res, next) => {
    const error = new Error('Resource not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app

