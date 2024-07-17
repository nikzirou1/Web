const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/sequelize");
const Car = sequelize.define("Car", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    carNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            },
            len: {
                args: [3, 15],
                msg: "The field should contain between 3 and 15 characters",
            },
            is: {
                args: [/^[\w]+$/],
                msg: "The field must contain only letters and numeric characters."
            }
        },
    },
    color: {
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
    model: {
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
            }
        },
    },
    yearOfRelease: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            },
            min: {
                args: [1999],
                msg: "Min year of release 1999."
            },
            max: {
                args: [2023],
                msg: "Max year of release 2023."
            },
        }
    },
    price: {
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
                args:[1000],
                msg:"The field should be greater then 1000."
            },
            max:{
                args:[1000000],
                msg:"The field should not be greater then 1000000."
            }
        },
    },
    engineId: {
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
    }
});
module.exports = Car;
