const Car = require('../model/Car');
const OrderRepository = require('../repository/sequelize/OrderRepository');
var authUtils = require('../utils/authUtils')

exports.addOrder = (req, res, next) =>
 {
    const orderData = {...req.body};
    
    OrderRepository.createOrder(orderData)
    .then( result =>
        {
            res.redirect('/orders');
        })
        .catch(err => {
             console.log(err.errors); 
             let allCars;
             Car.findAll()
                 .then(cars => {
                    res.render('pages/order/form', {
                        order: orderData,
                        pageTitle: req.__('orders.form.add.pageTitle'),
                        formMode: 'createNew',
                        btnLabel: req.__('orders.form.add.btnLabel'),
                        formAction: '/orders/add',
                        navLoc: 'order',
                        allCars: cars,
                        validationErrors: err.errors
                    });
                });
        });
};

 
 exports.updateOrder = (req, res, next) =>
 {
    const orderId = req.body.id;
    const orderData = { ...req.body };
    let allCars;
    Car.findAll()
        .then(cars => {
            allCars = cars;
   OrderRepository.updateOrder(orderId, orderData)
   
        .then(  result => {
            
           res.redirect ('/orders');
        })
        .catch(err => {
            OrderRepository.getOrderById(orderId)
                .then(orderData => {
                    res.render('pages/order/form', {
                        order: orderData,
                        pageTitle: req.__('orders.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('orders.form.edit.btnLabel'),
                        formAction: '/orders/edit',
                        navLoc: 'order',
                        allCars: allCars,
                        validationErrors: err.errors
                        
                    });
                })
                .catch(err => {
                    console.log(err.errors);
                })
        });
    })
 };
 exports.deleteOrder  = (req, res, next) => {

    const orderId = req.params.orderId;
    OrderRepository.deleteOrder(orderId)
    .then( () =>
        {
            res.redirect('/orders'); 
        });


 };



exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrders()
        .then(orders => {     
    res.render('pages/order/list', {
        orders: orders,
        navLoc:'order'});
    });
}

exports.showAddOrderForm = (req, res, next) => {
    let allCars;
    Car.findAll()
        .then(cars => {
            allCars = cars;
            
            res.render('pages/order/form', {
                order: {},
                pageTitle: req.__('orders.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('orders.form.add.btnLabel'),
                formAction: '/orders/add',
                navLoc: 'order',
                allCars: allCars,
                validationErrors: []
            });
        })
}

exports.showEditOrderForm = (req, res, next) => {
    const orderId = req.params.orderId;
    let allCars;
    Car.findAll()
        .then(cars => {
            allCars = cars;
            return OrderRepository.getOrderById(orderId);
        })
        .then(order =>{
            res.render('pages/order/form', {
                order: order,
                formMode: 'edit',
                pageTitle: req.__('orders.form.edit.pageTitle'),
                btnLabel: req.__('orders.form.edit.btnLabel'),
                formAction: '/orders/edit',
                navLoc: 'order',
                allCars: allCars,
                validationErrors: []
            });
        });
}

exports.showOrderDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    let allCars;
    Car.findAll()
        .then(cars => {
            allCars = cars;
            return OrderRepository.getOrderById(orderId);
        })
        .then(order =>{
            res.render('pages/order/form', {
            order: order,
            formMode: 'showDetails',
            pageTitle: req.__('orders.form.details.pageTitle'),
            formAction: '',
            navLoc: 'order',
            allCars: allCars,
            validationErrors: []
            });
        });
    
}

