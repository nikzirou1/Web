const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/sequelize");
const Engine = sequelize.define("Engine", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    engineSize: {
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
    engineWeight: {
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
            min:{
                args:[0],
                msg:"The field should be greater then 0."
            },
            max:{
                args:[99],
                msg:"The field should be less then 100."
            }
        },
    },

    provider: {
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
    material: {
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
});
module.exports = Engine;
