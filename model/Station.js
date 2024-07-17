const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/sequelize");
const Station = sequelize.define("Station", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
     ownerId: {
        type: Sequelize.INTEGER,
         allowNull: false,
         validate: {
             notNull: {
                 msg: "The field is required.",
             },
             notEmpty: {
                 msg: "The field is required.",
             },
         },
     },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            },
            len: {
                args: [2, 10],
                msg: "The field should contain between 2 and 10 characters",
            },
            is:{
                args: [/^[a-zA-Z][ \w]*$/],
                msg: "The field should starts with letter character and contain only letters and numbers"
            },
            
        },
    },

    
   
});


module.exports = Station;
