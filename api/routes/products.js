const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Product = require('../model/product')
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        price: req.body.price
    })
    product
        .save()
        .then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    res.status(201).json({
        message: 'product created',
        product: product
    })
})

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                errCode: 12,
                message: 'Not found'
            })
        })
    
})

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId
    if (productId > 0) {
        res.status(200).json({
            productId: 12,
            productName: 'sp12'
        })
    } else {
        res.status(404).json({
            errCode: 12,
            message: 'Not found'
        })
    }
    
})

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId
    if (productId > 0) {
        res.status(200).json({
            message: 'Deleted'
        })
    } else {
        res.status(404).json({
            errCode: 12,
            message: 'Not found'
        })
    }
    
})

module.exports = router
