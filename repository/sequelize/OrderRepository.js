const Car = require("../../model/Car");
const Owner = require("../../model/Owner");
const Engine = require("../../model/Engine");
const Order = require("../../model/Orders");
const Station = require("../../model/Station")

exports.getOrders = () => 
{
    return Order.findAll();
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId,
        {
            include: [{
                model:Car,
                as:"cars",
                include: [{
                    model:Engine,
                    as:"engines"
                }],
                include: [{
                    model: Owner,
                    as: "owners"
                }]
            }]
        });


};  




exports.createOrder = (newOrderData) =>
{
    return Order.create({
        carId: newOrderData.carId,
        service: newOrderData.service,
        status: newOrderData.status,
        dateOfOrder: newOrderData.dateOfOrder,


    });
};

exports.updateOrder = (orderId, orderData) => 
{
    return Order.update(orderData, { where: {id: orderId}});
};

exports.deleteOrder = (orderId) => 
{
    return Order.destroy({
        where: { id: orderId},
        force: true
    });
}