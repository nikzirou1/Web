const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/sequelize");
const Order = sequelize.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
     carId: {
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
    service: {
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
        },
    },

    status: {
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
        },
    },

    
    
    dateOfOrder: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            },
        },
    },

   
});


module.exports = Order;
