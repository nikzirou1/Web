const Station = require('../model/Station');
const StationRepository = require('../repository/sequelize/StationRepository');

exports.getStations = (req, res, next) => 
{
    StationRepository.getStations()
    .then(station => 
        {
            res.status(200).json(station);
        })
        .catch(err => 
            {
                console.log(err);
            } );
};

exports.getStationById = (req, res, next) => 
{
    const stationId = req.params.stationId;
    StationRepository.getStationById(stationId)
    .then(station =>
        {
            if(!station)
            {
                res.status(404).json({
                    message: 'Station with id: '+stationId+' not found '
                })
            }
            else
            {
                res.status(200).json(station);
            }
        });
};

exports.createStation = (req, res, next) => 
{
StationRepository.createStation( req.query)
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


exports.updateStation = (req, res, next) => 
{
const stationId = req.params.stationId;
StationRepository.updateStation(stationId, req.query)
.then(result => {
    res.status(200).json({messege: 'Station updated!', station: result});
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



exports.deleteStation = (req, res, next) => 
{
const stationId = req.params.stationId;
StationRepository.deleteStation(stationId)
.then(result => {
    res.status(200).json({messege: 'Station removed!', station: result});
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