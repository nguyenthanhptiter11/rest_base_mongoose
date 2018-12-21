const express = require('express')
const router = express.Router() 

router.get('/', (req, res, next) => {
    res.status(200).json({
        total: 100,
        data: [
            { orderId: 1, orderName: 'sp1' }
        ]
    })
})

router.post('/', (req, res, next) => {
    const order = {
        orderName: req.body.orderName,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'order created',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    if (orderId > 0) {
        res.status(200).json({
            orderId: 12,
            orderName: 'sp12'
        })
    } else {
        res.status(404).json({
            errCode: 12,
            message: 'Not found'
        })
    }
    
})

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    if (orderId > 0) {
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
