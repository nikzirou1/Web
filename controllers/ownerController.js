const OwnerRepository = require('../repository/sequelize/OwnerRepository');
var authUtils = require('../utils/authUtils')

exports.addOwner = (req, res, next) =>
 {
    const ownerData = {...req.body};
    ownerData.password = authUtils.hashPassword(ownerData.password);
    OwnerRepository.createOwner(ownerData)
    .then( result =>
        {
            res.redirect('/owners');
        })
        .catch(err => {
             console.log(err.errors); 
            res.render('pages/owner/form', {
                owner: ownerData,
                pageTitle: req.__('own.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('own.form.add.btnLabel'),
                formAction: '/owners/add',
                navLoc: 'owner',
                validationErrors: err.errors
            });
        });
};

 
 exports.updateOwner = (req, res, next) =>
 {
    const ownerId = req.body.id;
    const ownerData = { ...req.body };
   OwnerRepository.updateOwner(ownerId, ownerData)
        .then(  result => {
           res.redirect ('/owners');
        })
        .catch(err => {
            OwnerRepository.getOwnerById(ownerId)
                .then(ownerData => {
                    res.render('pages/owner/form', {
                        owner: ownerData,
                        pageTitle: req.__('own.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('own.form.edit.btnLabel'),
                        formAction: '/owners/edit',
                        navLoc: 'owner',
                        validationErrors: err.errors
                        
                    });
                })
                .catch(err => {
                    console.log(err.errors);
                })
        });
        
 };
 exports.deleteOwner  = (req, res, next) => {

    const ownerId = req.params.ownerId;
    OwnerRepository.deleteOwner(ownerId)
    .then( () =>
        {
            res.redirect('/owners');
        });


 };



exports.showOwnerList = (req, res, next) => {
    OwnerRepository.getOwners()
        .then(owners => {     
    res.render('pages/owner/list1', {
        owners: owners,
        navLoc:'owner'});
    });
}

exports.showAddOwnerForm = (req, res, next) => {
    res.render('pages/owner/form', {
        owner: {},
        pageTitle: req.__('own.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('own.form.add.btnLabel'),
        formAction: '/owners/add',
        navLoc: 'owner',
        validationErrors: []
    });
}

exports.showEditOwnerForm = (req, res, next) => {
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
    .then(owner => {
    res.render('pages/owner/form', {
        owner: owner,
        formMode: 'edit',
        pageTitle: req.__('own.form.details.pageTitle'),
        btnLabel: req.__('own.form.edit.btnLabel'),
        formAction: '/owners/edit',
        navLoc: 'owner',
        validationErrors: []
    });
});
}

exports.showOwnerDetails = (req, res, next) => {
    const ownerId = req.params.ownerId;
    OwnerRepository.getOwnerById(ownerId)
        .then(owner =>{
            res.render('pages/owner/form', {
            owner: owner,
            formMode: 'showDetails',
            pageTitle: req.__('own.form.details.pageTitle'),
            formAction: '',
            navLoc: 'owner',
            validationErrors: []
            });
        });
    
}

