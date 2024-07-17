const Car = require("../../model/Car");
const Owner = require("../../model/Owner");
const Engine = require("../../model/Engine");
const Order = require("../../model/Orders");
const Station = require("../../model/Station")

exports.getStations = () => 
{
    return Station.findAll();
};

exports.getStationById = (stationId) => {
    return Station.findByPk(stationId,
        {
           
            
                include: [{
                    model: Owner,
                    as: "owners"
                }]
            });
        

};  




exports.createStation = (newStationData) =>
{
    return Station.create({
        ownerId: newStationData.ownerId,
        address: newStationData.address
        


    });
};

exports.updateStation = (stationId, stationData) => 
{
    return Station.update(stationData, { where: {id: stationId}});
};

exports.deleteStation = (stationId) => 
{
    return Station.destroy({
        where: { id: stationId},
        force: true
    });
}