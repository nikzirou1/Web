const Car = require("../../model/Car");
const Owner = require("../../model/Owner");
const Order = require("../../model/Orders");
const Engine = require("../../model/Engine");
const Station = require("../../model/Station")

exports.getOwners = () => 
{
    return Owner.findAll();
};

exports.getOwnerById = (ownerId) => {
    return Owner.findByPk(ownerId,
        {
            include: [{
                model:Car,
                as:"cars",
                include: [{
                    model:Engine,
                    as:"engines"
                }]
            }]
        });


};  


exports.findByEmail = (email) =>
{
    return Owner.findAll(
        {
            where: {email: email},
            include: [{
                model:Car,
                as:"cars",
                include: [{
                    model:Engine,
                    as:"engines"
                }],
                include: [{
                    model: Order,
                    as: "orders"
                }]
            }]
        }
    );
}

exports.createOwner = (newOwnerData) =>
{
    return Owner.create({
        firstName: newOwnerData.firstName,
        lastName: newOwnerData.lastName,
        salary: newOwnerData.salary,
        email: newOwnerData.email,
        birthday: newOwnerData.birthday,
        password: newOwnerData.password,
        isAdmin: newOwnerData.hasOwnProperty("isAdmin")


    });
};

exports.updateOwner = (ownerId, ownerData) => 
{
    return Owner.update(ownerData, { where: {id: ownerId}});
};

exports.deleteOwner = (ownerId) => 
{
    return Owner.destroy({
        where: { id: ownerId}
    });
}