const Order = require('../model/Orders');
const OrderRepository = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => 
{
    OrderRepository.getOrders()
    .then(order => 
        {
            res.status(200).json(order);
        })
        .catch(err => 
            {
                console.log(err);
            } );
};

exports.getOrderById = (req, res, next) => 
{
    const orderId = req.params.orderId;
    OrderRepository.getOrderById(orderId)
    .then(order =>
        {
            if(!order)
            {
                res.status(404).json({
                    message: 'Order with id: '+orderId+' not found '
                })
            }
            else
            {
                res.status(200).json(order);
            }
        });
};

exports.createOrder = (req, res, next) => 
{
OrderRepository.createOrder( req.query)
.then(newObj => {
    res.status(201).json(newObj);
})
    .catch(err => 
        {
            if(!err.statusCode)
            {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.updateOrder = (req, res, next) => 
{
const orderId = req.params.orderId;
OrderRepository.updateOrder(orderId, req.query)
.then(result => {
    res.status(200).json({messege: 'Order updated!', order: result});
})
    .catch(err => 
        {
            if(!err.statusCode)
            {
                err.statusCode = 500;
            }
            next(err);
        });
};



exports.deleteOrder = (req, res, next) => 
{
const orderId = req.params.orderId;
OrderRepository.deleteOrder(orderId)
.then(result => {
    res.status(200).json({messege: 'Order removed!', order: result});
})
    .catch(err => 
        {
            if(!err.statusCode)
            {
                err.statusCode = 500;
            }
            next(err);
        });
};