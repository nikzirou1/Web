const CarRepository = require('../repository/sequelize/CarRepository');
const OwnerRepository = require('../repository/sequelize/OwnerRepository');
const EngineRepository = require('../repository/sequelize/EngineRepository');

exports.addCar = (req, res, next) =>
 {
    const carData = {...req.body};
    CarRepository.createCar(carData)
    .then( result =>
        {
            res.redirect('/cars');
        })
        .catch(err => {
            let allOwners, allEngines;
            OwnerRepository.getOwners()
                .then(owners => 
                    {
                        allOwners = owners;
                        return EngineRepository.getEngines();
                    }) 
                .then(engines =>{
                    allEngines = engines;
                    res.render('pages/car/form', {
                        car: carData,
                        pageTitle: req.__('car.form.add.pageTitle'),
                        formMode: 'createNew',
                        btnLabel: req.__('car.form.add.btnLabel'),
                        formAction: '/cars/add',
                        allOwners: allOwners,
                        allEngines: allEngines,
                        navLoc: 'car',
                        validationErrors: err.errors
                    });
        });

    });
}

 exports.updateCar = (req, res, next) =>
 {
    const carId = req.body.id;
    const carData = { ...req.body };
   CarRepository.updateCar(carId, carData)  
        .then(  result => {
           res.redirect ('/cars');
        })
        .catch(err => {
            let allOwners, allEngines;
            OwnerRepository.getOwners()
                .then(owners => 
                    {
                        allOwners = owners;
                        return EngineRepository.getEngines();
                    }) 
                .then(engines =>{
                    allEngines = engines;
                    res.render('pages/car/form', {
                        car: carData,
                        pageTitle: req.__('car.form.edit.pageTitle'),
                        formMode: 'update',
                        btnLabel: req.__('car.form.edit.btnLabel'),
                        formAction: '/cars/edit',
                        navLoc: 'car',
                        allOwners: allOwners,
                        allEngines: allEngines,
                        validationErrors: err.errors
                    });
                });
        })
    
 };
 exports.deleteCar  = (req, res, next) => {

    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
    .then( () =>
        {
            res.redirect('/cars');
        });


 };

exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
    .then(cars => {
        res.render('pages/car/list', {
            cars: cars,
            navLoc: "car"});
    });
   
}

exports.showEditCarForm = (req, res, next) => {
    const carId = req.params.carId;
    
    let allOwners, allEngines;
    OwnerRepository.getOwners()
        .then(owners => 
            {
                allOwners = owners;
                return EngineRepository.getEngines();
            }) 
        .then(engines =>{
            allEngines = engines;
            return CarRepository.getCarById(carId);
        })
        .then(car => {
            res.render('pages/car/form', {
            car: car,
            allOwners: allOwners,
            allEngines: allEngines,
            formMode: 'edit',
            pageTitle: req.__('car.form.edit.pageTitle'),
            btnLabel: req.__('car.form.edit.btnLabel'),
            formAction: '/cars/edit',
            navLoc: 'car',
            validationErrors: []
            });
        });
}

/*
formMode: 'edit',
        pageTitle: 'Edit car',
        btnLabel: 'Edit car',
        formAction: '/cars/edit',
        navLoc: 'car'
*/

exports.showAddCarForm = (req, res, next) => {
    let allOwners, allEngines;
    OwnerRepository.getOwners()
        .then(owners => 
            {
                allOwners = owners;
                return EngineRepository.getEngines();
            }) 
                .then(engines => 
                    {
                        allEngines = engines;
                        res.render('pages/car/form',
                        {
                            car: {},
                            formMode: 'createNew',
                            allOwners: allOwners,
                            allEngines: allEngines,
                            pageTitle: req.__('car.form.add.pageTitle'),
                            btnLabel: req.__('car.form.add.btnLabel'),
                            formAction: '/cars/add',
                            navLoc: 'car',
                            validationErrors: []
                        });
                    });
    
}




exports.showCarDetails = (req, res, next) => {
    const carId = req.params.carId;
    
    let allOwners, allEngines;
    OwnerRepository.getOwners()
        .then(owners => 
            {
                allOwners = owners;
                return EngineRepository.getEngines();
            }) 
        .then(engines =>{
            allEngines = engines;
            return CarRepository.getCarById(carId);
        })
        .then(car => {
            res.render('pages/car/form', {
            car: car,
            allOwners: allOwners,
            allEngines: allEngines,
            formMode: 'showDetails',
            pageTitle: req.__('car.form.details.pageTitle'),
            formAction: '',
            navLoc: 'car',
            validationErrors: []
            });
        });
}   