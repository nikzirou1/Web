const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize/sequelize");
const Owner = sequelize.define("Owner", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
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
                args: [4, 20],
                msg: "The field should contain between 4 and 20 characters",
            },
            is: {
                args: [/^[a-zA-Z]+$/i],
                msg: "The field should contain only latters"
            }
        },
    },
    lastName: {
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
                args: [4, 20],
                msg: "The field should contain between 4 and 20 characters",
            },
            is: {
                args: [/^[a-zA-Z]+$/i],
                msg: "The field should contain only latters"
            }
        },
    },
    salary: {
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
                args: [0],
                msg: "Cannot be less than 0",
            },
            max: {
                args: [100000],
                msg: "Cannot be more then 100000",
            },
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "The field must be unique",
        },
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            },
            len: {
                args: [5, 60],
                msg: "The field should contain between 2 and 60 characters",
            },
            isEmail: {
                msg: "The field should contain a valid email address",
            },
        },
    },
    birthday: {
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

    password: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The field is required.",
            },
            notEmpty: {
                msg: "The field is required.",
            }
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});


module.exports = Owner;
