const sequelize = require("./sequelize");

const Car = require('../../model/Car');
const Engine = require('../../model/Engine');
const Owner = require('../../model/Owner');
const Order = require('../../model/Orders')
const Station = require('../../model/Station')
const { engine } = require("express/lib/application");

const authUtil = require('../../utils/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = ()=> {
Owner.hasMany(Car,{as: 'cars', foreignKey: {name: 'ownerId', allowNull: false }, constraints: true, onDelete: "CASCADE"});
Car.belongsTo(Owner, {as: 'owners', foreignKey: {name: 'ownerId', allowNull: false}});

Car.hasMany(Order,{as: 'orders', foreignKey: {name: 'carId', allowNull: false }, constraints: true, onDelete: "CASCADE"});
Order.belongsTo(Car, {as: 'cars', foreignKey: {name: 'carId', allowNull: false}});

Owner.hasMany(Station,{as: 'stations', foreignKey: {name: 'ownerId', allowNull: false }, constraints: true, onDelete: "CASCADE"});
Station.belongsTo(Owner, {as: 'owners', foreignKey: {name: 'ownerId', allowNull: false}});

Engine.hasMany(Car,{as: 'cars', foreignKey: {name: 'engineId', allowNull: false }, constraints: true, onDelete: "CASCADE"});
Car.belongsTo(Engine, {as: 'engines', foreignKey: {name: 'engineId', allowNull: false}});



let allOwners, allEngines, allCars, allOrders, allStations;

return sequelize
    .sync({force: true})
    .then( () => {
        return Owner.findAll();

    })
    .then(owner => {
        if(!owner || owner.length == 0){
            return Owner.bulkCreate([
                    {firstName: 'Michal', lastName: 'Bell', salary: 2000, email: 'bobs@mail.ru', birthday: '2006-10-10', password: passHash },
                    {firstName: 'Nazar', lastName: 'Kirichenko', salary: 10000, email: 'bobs2@mail.ru', birthday: '2001-01-19', password: passHash },
                    {firstName: 'Anton', lastName: 'Kaduk', salary: 7500 , email: 'bobs3@mail.ru', birthday: '2002-11-11', password: passHash, isAdmin: true },
            ])
                .then( () =>
                {
                    return Owner.findAll();
                });
        } else {
            return owner;
        }
    })
        .then(owner => 
            {

                allOwners = owner;
                return Engine.findAll();
            })






            
            .then(engine => 
                {
                    if(!engine || engine.length == 0)
                    {
                        return Engine.bulkCreate([
                            {engineSize: '1.0 to 2.0-liters', engineWeight: 20, provider: 'ComiesEA', material: 'Silver' },
                            {engineSize: '2.0 to 3.0-liters', engineWeight: 10, provider: 'Konami Interactive', material: 'Steel' }

                    ])
                    .then( () => 
                    {
                        return Owner.findAll();

                    });
                } else {
                    return engine;
                }               
            })
                .then(engine => {
                    allEngines = engine;
                    return Car.findAll();


                })
                    .then(cars => 
                        {
                            if(!cars || cars.length == 0)

                            {
                                return Car.bulkCreate([
                                    {ownerId: allOwners[0].id, engineId: allEngines[0].id, carNumber: 222, color: 'Blue', model: 'Toyota', yearOfRelease: '2006', price: '5000'},
                                    {ownerId: allOwners[1].id, engineId: allEngines[0].id, carNumber: 333, color: 'Red', model: 'BMW', yearOfRelease: '2001', price: '8000'},
                                    {ownerId: allOwners[0].id, engineId: allEngines[1].id, carNumber: 555, color: 'Black', model: 'ARK', yearOfRelease: '2002', price: '9000'},
                                    {ownerId: allOwners[1].id, engineId: allEngines[1].id, carNumber: 666, color: 'Black', model: 'ARK1', yearOfRelease: '2002', price: '7000'}


                                ]);

                            } else {
                                return cars;
                            }
                        })
                        .then(cars => {
                            allCars = cars;
                            return Order.findAll();
        
        
                        })
                        .then(orders => {
                            if(!orders || orders.length == 0){
                                return Order.bulkCreate([
                                        {carId: allCars[0].id, service: "Clean the car", status: "Complete",  dateOfOrder: '2006-10-10' },
                                        {carId: allCars[1].id, service: "Change wheels", status: "Queued",  dateOfOrder: '2008-10-10' },
                                ]);
                                    
                            } else {
                                return orders;
                            }
                        })
                            .then( (orders) =>
                                    {
                                        allOrders = orders
                                        return Station.findAll();
                                    })
                        
                                .then(stations => 
                                {
                                    allStations = stations;
                                })
                                .then(stations => {
                                    if(!stations || stations.length == 0){
                                        return Station.bulkCreate([
                                                
                                                {ownerId: allOwners[2].id, address: "Gagarina17" },
                                        ])
                                    } else {
                                        return stations;
                                    }
                                })
                                .then(stations => {
                                    allStations = stations;
                                    
                                })
                                   
                                        
};