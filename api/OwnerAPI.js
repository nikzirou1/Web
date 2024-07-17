const Owner = require('../model/Owner');
const OwnerRepository = require('../repository/sequelize/OwnerRepository');

exports.getOwners = (req, res, next) => 
{
    OwnerRepository.getOwners()
    .then(owner => 
        {
            res.status(200).json(owner);
        })
        .catch(err => 
            {
                console.log(err);
            } );
};

exports.getOwnerById = (req, res, next) => 
{
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
    .then(owner =>
        {
            if(!owner)
            {
                res.status(404).json({
                    message: 'Owner with id: '+ownerId+' not found '
                })
            }
            else
            {
                res.status(200).json(owner);
            }
        });
};

exports.createOwner = (req, res, next) => 
{
OwnerRepository.createOwner( req.query)
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


exports.updateOwner = (req, res, next) => 
{
const ownerId = req.params.ownerId;
OwnerRepository.updateOwner(ownerId, req.query)
.then(result => {
    res.status(200).json({messege: 'Owner updated!', owner: result});
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



exports.deleteOwner = (req, res, next) => 
{
const ownerId = req.params.ownerId;
OwnerRepository.deleteOwner(ownerId)
.then(result => {
    res.status(200).json({messege: 'Owner removed!', owner: result});
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