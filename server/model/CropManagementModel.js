const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/Database.js');
const UserModel = require('./UserModel.js');
const CropModel = require('./CropModel.js');

const CropManagementModel = sequelize.define('CROP_MANAGEMENT_T', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    c_management_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    c_management_date: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            isDate: true,
        },
    },
    c_management_harvest: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    c_management_stored: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    c_management_sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    c_management_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cropId:{
        type: DataTypes.INTEGER,
        allowNull:true,
        validate: {
            notEmpty:true,
        }
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'user_uuid',
        },
    },
}, {
    freezeTableName: true,
});

CropManagementModel.belongsTo(CropModel, { foreignKey: 'cropId' });
CropManagementModel.belongsTo(UserModel, { foreignKey: 'userId', targetKey: 'user_uuid' });


module.exports = CropManagementModel;
