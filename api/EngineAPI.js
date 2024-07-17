const Engine = require('../model/Engine');
const EngineRepository = require('../repository/sequelize/EngineRepository');

exports.getEngines = (req, res, next) => 
{
    EngineRepository.getEngines()
    .then(engine => 
        {
            res.status(200).json(engine);
        })
        .catch(err => 
            {
                console.log(err);
            } );
};

exports.getEngineById = (req, res, next) => 
{
    const engineId = req.params.engineId;
    EngineRepository.getEngineById(engineId)
    .then(engine =>
        {
            if(!engine)
            {
                res.status(404).json({
                    message: 'Engine with id: '+ownerId+' not found '
                })
            }
            else
            {
                res.status(200).json(engine);
            }
        });
};

exports.createEngine = (req, res, next) => 
{
EngineRepository.createEngine( req.query)
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


exports.updateEngine = (req, res, next) => 
{
const engineId = req.params.engineId;
EngineRepository.updateEngine(engineId, req.query)
.then(result => {
    res.status(200).json({messege: 'Engine updated!', engine: result});
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



exports.deleteEngine = (req, res, next) => 
{
const engineId = req.params.engineId;
EngineRepository.deleteEngine(engineId)
.then(result => {
    res.status(200).json({messege: 'Engine removed!', engine: result});
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