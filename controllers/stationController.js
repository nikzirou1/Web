const Owner = require('../model/Owner');
const StationRepository = require('../repository/sequelize/StationRepository');
var authUtils = require('../utils/authUtils')

exports.addStation = (req, res, next) =>
 {
    const stationData = {...req.body};
    
    StationRepository.createStation(stationData)
    .then( result =>
        {
            res.redirect('/stations');
        })
        .catch(err => {
             console.log(err.errors); 
             let allOwners;
             Owner.findAll()
                 .then(owners => {
                    res.render('pages/station/form', {
                        station: stationData,
                        pageTitle: 'Adding an station',
                        formMode: 'createNew',
                        btnLabel: 'Add station',
                        formAction: '/stations/add',
                        navLoc: 'station',
                        allOwners: owners,
                        validationErrors: err.errors
                    });
                });
        });
};

 
 exports.updateStation = (req, res, next) =>
 {
    const stationId = req.body.id;
    const stationData = { ...req.body };
    let allOwners;
    Owner.findAll()
        .then(owners => {
            allOwners = owners;
   StationRepository.updateStation(stationId, stationData)
        .then(  result => {
           res.redirect ('/stations');
        })
        
        .catch(err => {
            StationRepository.getStationById(stationId)
                .then(stationData => {
                    res.render('pages/station/form', {
                        station: stationData,
                        pageTitle: 'Edit station',
                        formMode: 'edit',
                        btnLabel: 'Edit station',
                        formAction: '/stations/edit',
                        navLoc: 'station',
                        allOwners: allOwners,
                        validationErrors: err.errors
                        
                    });
                })
                .catch(err => {
                    console.log(err.errors);
                })
        });
    });
        
 };
 exports.deleteStation  = (req, res, next) => {

    const stationId = req.params.stationId;
    StationRepository.deleteStation(stationId)
    .then( () =>
        {
            res.redirect('/stations'); 
        });


 };



exports.showStationList = (req, res, next) => {
    StationRepository.getStations()
        .then(stations => {     
    res.render('pages/station/list', {
        stations: stations,
        navLoc:'station'});
    });
}

exports.showAddStationForm = (req, res, next) => {
    let allOwners;
    Owner.findAll()
        .then(owners => {
            allOwners = owners;
            
            res.render('pages/station/form', {
                station: {},
                pageTitle: 'New station',
                formMode: 'createNew',
                btnLabel: 'Add station',
                formAction: '/stations/add',
                navLoc: 'station',
                allOwners: allOwners,
                validationErrors: []
            });
        })
}

exports.showEditStationForm = (req, res, next) => {
    const stationId = req.params.stationId;
    let allOwners;
    Owner.findAll()
        .then(owners => {
            allOwners = owners;
            return StationRepository.getStationById(stationId);
        })
        .then(station =>{
            res.render('pages/station/form', {
                station: station,
                formMode: 'edit',
                pageTitle: 'Edit station',
                btnLabel: 'Edit station',
                formAction: '/stations/edit',
                navLoc: 'station',
                allOwners: allOwners,
                validationErrors: []
            });
        });
}

exports.showStationDetails = (req, res, next) => {
    const stationId = req.params.stationId;
    let allOwners;
    Owner.findAll()
        .then(owners => {
            allOwners = owners;
            return StationRepository.getStationById(stationId);
        })
        .then(station =>{
            res.render('pages/station/form', {
            station: station,
            formMode: 'showDetails',
            pageTitle: 'Station details',
            formAction: '',
            navLoc: 'station',
            allOwners: allOwners,
            validationErrors: []
            });
        });
    
}

