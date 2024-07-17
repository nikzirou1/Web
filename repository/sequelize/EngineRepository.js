const Car = require("../../model/Car");
const Owner = require("../../model/Owner");
const Order = require("../../model/Orders");
const Engine = require("../../model/Engine");
const Station = require("../../model/Station")

exports.getEngines = () => 
{
    return Engine.findAll();
};

exports.getEngineById = (engineId) => {
    return Engine.findByPk(engineId,
        {
            include: [{
                model:Car,
                as:"cars",
                include: [{
                    model:Owner,
                    as:"owners"
                }]
            }]
        });


};  

exports.createEngine = (newEngineData) =>
{
    return Engine.create({
        engineSize: newEngineData.engineSize,
        engineWeight: newEngineData.engineWeight,
        provider: newEngineData.provider,
        material: newEngineData.material,
       


    });
};

exports.updateEngine = (engineId, engineData) => 
{
    const engineSize = engineData.engineSize;
    const engineWeight = engineData.engineWeight;
    const provider = engineData.provider;
    const material = engineData.material;
    return Engine.update(engineData, { where: {id: engineId}});
};

exports.deleteEngine = (engineId) => 
{
    return Engine.destroy({
        where: { id: engineId}
    });
}