
const Sequelize = require('sequelize');
const Order = require("../../model/Orders");
const Car = require("../../model/Car");
const Owner = require("../../model/Owner");
const Engine = require("../../model/Engine");
const Station = require("../../model/Station")

exports.getCars = () => 
{
    return Car.findAll({include:[
        {
            model:Owner,
            as:'owners'
        },
        {
            model:Engine,
            as: 'engines' 
        }]
    });
};

exports.getCarById = (carId) =>
{
    return Car.findByPk(carId, {include: [
        {
            model:Owner,
            as: 'owners'
        },
        {
            model: Engine,
            as: 'engines'
        }]
    });
};

exports.createCar = (data) =>
{
    return Car.create({
        id: data.id,
        carNumber: data.carNumber,
        color: data.color,
        model: data.model,
        yearOfRelease: data.yearOfRelease,
        price: data.price,
        engineId: data.engineId,
        ownerId: data.ownerId
    });
};

exports.updateCar = (carId, data) => {
    return Car.update(data, {where: {id: carId}});      
}

exports.deleteCar = (carId) => 
{
return Car.destroy( {
    where: { id: carId}
});
}

exports.deleteManyCars = (carIds) => 
{
    return Car.find({id: { [Sequelize.Op.in]: carIds}})
}